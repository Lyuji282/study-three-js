// @flow

import * as THREE from 'three';
import type {MouseDownRaycaster} from "../../action/overlap/mouse-down-raycaster";
import type {TouchStartRaycaster} from "../../action/overlap/touch-start-raycaster";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import {isMeshOverlap} from "../mesh";

/** パラメータ */
type Param = {
  geometry: THREE.Geometry,
  listener: Observable<GameObjectAction>,
  onButtonPush: () => void
};

/** ボタン押下判定オブジェクト */
export class ButtonOverlap {
  _mesh: THREE.Mesh;
  _onButtonPush: () => void;

  constructor(param: Param) {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('rgb(0, 255, 0)'),
      visible: false
    });
    this._mesh = new THREE.Mesh(param.geometry, material);

    param.listener.subscribe(action => {
      switch (action.type) {
        case 'mouseDownRaycaster':
          this._mouseDownRaycaster(action);
          return;
        case 'touchStartRaycaster':
          this._touchStartRaycaster(action);
          return;
        default:
          return;
      }
    });

    this._onButtonPush = param.onButtonPush;
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._mesh;
  }

  /** マウスダウン */
  _mouseDownRaycaster(action: MouseDownRaycaster): void {
    if (isMeshOverlap(action.mouse.raycaster, this._mesh)) {
      this._onButtonPush();
    }
  }

  /** タッチスタート */
  _touchStartRaycaster(action: TouchStartRaycaster): void {
    const overlapTouches = action.touch.targetTouches
      .filter(v => isMeshOverlap(v.raycaster, this._mesh));
    const isTouchOverlap = 0 < overlapTouches.length;
    if (isTouchOverlap) {
      this._onButtonPush();
    }
  }
}