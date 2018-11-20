// @flow

import * as THREE from 'three';
import type {GaugeView} from "./view/gauge-view";
import type {GaugeModel} from "./model/gauge-model";
import {refresh} from "./animation/regresh";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Update} from "../../action/game-loop/update";
import type {PreRender} from "../../action/game-loop/pre-render";
import {TweenAnimation} from "../../animation/tween-animation";
import {hp} from "./animation/hp";
import {battery} from './animation/battery';

type Param = {
  listener: Observable<GameObjectAction>,
  view: GaugeView,
  hp: number,
  battery: number
};

/** ゲージ */
export class Gauge {
  _model: GaugeModel;
  _view: GaugeView;

  constructor(param: Param) {
    this._view = param.view;
    this._model = {
      hp: param.hp,
      maxHp: param.hp,
      battery: param.battery,
      maxBattery: param.battery
    };

    param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** ゲージ内容更新 */
  refresh(hp: number, battery: number): TweenAnimation {
    return refresh(this._model, hp, battery);
  }

  hp(value: number): TweenAnimation {
    return hp(this._model, value);
  }

  battery(value: number): TweenAnimation {
    return battery(this._model, value);
  }

  /** ゲージで使われているthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}
