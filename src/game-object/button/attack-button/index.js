// @flow
import * as THREE from "three";
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./model/button-model";
import type {TouchRaycastContainer} from "../../../operation/touch/touch-raycaster";import type {Resources} from "../../../resource";
import {AttackButtonView} from "./attack-button-view";
import {push} from "./model/push";
import {isGroupPlaying} from "../../../tween/is-group-playing";
import {isTouch} from "../../../operation/touch/touch-checker";

/** コンストラクタのパラメータ */
type Param = {
  /** ボタンで使うビュー */
  resources: Resources,
  /** ボタンがクリックされた際のコールバック関数 */
  onPush: () => void
};

//TODO 表示・非表示、コントロール可能・不可の設定を追加する
/** コウゲキボタン */
export class AttackButton {
  _model: ButtonModel;
  _view: AttackButtonView;
  _tweenGroup: Group;
  _onPush: () => void;

  constructor(param: Param) {
    this._model = {
      scale: 1,
      opacity: 1
    };
    this._view = new AttackButtonView(param.resources);
    this._tweenGroup = new Group();
    this._onPush = param.onPush;
  }

  /** ゲームループ */
  gameLoop(time: DOMHighResTimeStamp) {
    this._tweenGroup.update(time);
    this._view.gameLoop(this._model);
  }

  /** ボタン押下アニメーション */
  push(): Tween.TWEEN {
    return push(this._model, this._tweenGroup);
  }

  /** 本オブジェクトで再生中のTweenを全て破棄する */
  removeAllTween(): void {
    this._tweenGroup.removeAll();
  }

  /** マウスダウンした際の処理 */
  onMouseDown(raycaster: THREE.Raycater): void {
    const isMouseOverlay = this._view.isOverlap(raycaster);
    if (isMouseOverlay) {
      this._onOverlay();
    }
  }

  /** ゲーム画面でタッチスタートした際の処理 */
  onTouchStart(touchRaycaster: TouchRaycastContainer): void {
    const isFingerOverlay = isTouch(touchRaycaster, this._view);
    if (isFingerOverlay) {
      this._onOverlay();
    }
  }

  /** マウス、指がボタンと重なった際の処理 */
  _onOverlay(): void {
    if (isGroupPlaying(this._tweenGroup)) {
      return;
    }

    this.push().start();
    this._onPush();
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}