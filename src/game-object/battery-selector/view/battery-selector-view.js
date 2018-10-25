// @flow

import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource/index";
import type {BatterySelectorModel} from "../model/battery-selector";
import * as THREE from "three";
import {SliderOperation} from "../../../operation/slider";
import * as R from 'ramda';
import {ButtonOperation} from "../../../operation/button";
import {refreshGauge} from "./refresh-gauge";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

/** メッシュの大きさ */
const MESH_SIZE = 512;
/** テクスチャの大きさ */
const TEXTURE_SIZE = 512;
/** スライダー当たり判定横幅 */
const SLIDER_WIDTH = 384;
/** スライダー当たり判定高 */
const SLIDER_HEIGHT = 80;
/** OKボタンの当たり判定横幅 */
const BUTTON_WIDTH = 248;
/** OKボタンの当たり判定横高 */
const BUTTON_HEIGHT = 80;
/** スライダー全体の拡大率 */
const SCALE = 0.6;

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲージ最大値 */
  maxValue: number,
  /** アクションリスナー */
  listener: Observable<GameObjectAction>,
  /** バッテリーが変更された場合のコールバック関数 */
  onBatteryChange: (battery: number) => void,
  /** OKボタンが押された時のコールバック関数 */
  onOkButtonPush: () => void,
};

/** バッテリーセレクターのビュー */
export class BatterySelectorView {
  /** 本ビューで使用するthree.jsオブジェクトをまとめたもの */
  _group: THREE.Group;
  /** バッテリースライダーを描画するキャンバス */
  _canvasMesh: CanvasMesh;
  /** バッテリースライダーの当たり判定を行う */
  _sliderOperation: SliderOperation;
  /** OKボタンの当たり判定を行う */
  _okButtonOperation: ButtonOperation;
  /** ゲームループで使うためにリソース管理オブジェクトをキャッシュする */
  _resources: Resources;
  /** 最後にビューに反映されたモデル */
  _lastEngagedModel: ?BatterySelectorModel;

  constructor(param: Param) {
    this._resources = param.resources;
    this._group = new THREE.Group();
    this._canvasMesh = new CanvasMesh({
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: TEXTURE_SIZE,
      canvasHeight: TEXTURE_SIZE,
    });
    this._group.add(this._canvasMesh.getObject3D());

    const minValue = 0;
    this._sliderOperation = new SliderOperation({
      values: R.range(minValue, param.maxValue + 1),
      width: SLIDER_WIDTH,
      height: SLIDER_HEIGHT,
      listener: param.listener,
      onValueChange: v => param.onBatteryChange(v)
    });
    this._sliderOperation.getObject3D().position.y += 64;
    this._group.add(this._sliderOperation.getObject3D());

    this._okButtonOperation = new ButtonOperation({
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      listener: param.listener,
      onButtonPush: () => {
        param.onOkButtonPush();
      }
    });
    this._okButtonOperation.getObject3D().position.y = -56;
    this._group.add(this._okButtonOperation.getObject3D());
  }

  /** シーンに追加するthree.jsのオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /** ビューにモデルを反映させる */
  engage(model: BatterySelectorModel): void {
    if (this._shouldCanvasRefresh(model)) {
      this._refreshCanvas(model);
    }
    this._setScale();
    this._setPos();
    this._setOpacity(model);
    this._updateLastModel(model);
  }

  /** 最終入力値を強制的に設定する */
  setLastBattery(battery: number): void {
    this._sliderOperation.lastValue = battery;
  }

  /** 最終入力値を取得する */
  getLastBattery(): ?number {
    return this._sliderOperation.lastValue;
  }

  /** 全体のスケールを調整する */
  _setScale(): void {
    this._group.scale.set(SCALE, SCALE, SCALE);
  }

  /** キャンバスを更新するか否かを返す、trueで更新する */
  _shouldCanvasRefresh(model: BatterySelectorModel): boolean {
    if (!this._lastEngagedModel) {
      return true;
    }

    return this._lastEngagedModel.slider.battery !== model.slider.battery
      || this._lastEngagedModel.slider.max !== model.slider.max
      || this._lastEngagedModel.slider.enableMax !== model.slider.enableMax
      || this._lastEngagedModel.okButton.depth !== model.okButton.depth
      || this._lastEngagedModel.okButton.label !== model.okButton.label
  }

  /** キャンバスを更新する */
  _refreshCanvas(model: BatterySelectorModel): void {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      refreshGauge(context, this._resources, model);
    });
  }

  /** バッテリースライダーの座標を更新する */
  _setPos(): void {
    this._group.position.x = 0;
    this._group.position.y = this._getPosY();
  }

  /** バッテリースライダーのY座標を計算する */
  _getPosY(): number {
    const min = -160;
    const posY = -window.innerHeight / 2 + 80;

    if (posY < min) {
      return min;
    } else {
      return posY;
    }
  }

  /** 透明度を更新する */
  _setOpacity(model: BatterySelectorModel): void {
    this._canvasMesh.setOpacity(model.opacity);
  }

  /** 最後にビューに反映されたモデルを引数で与えれた内容で更新する */
  _updateLastModel(model: BatterySelectorModel): void {
    this._lastEngagedModel = R.clone(model);
  }
}