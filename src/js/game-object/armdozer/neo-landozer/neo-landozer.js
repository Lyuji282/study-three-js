// @flow

import {ArmDozerSprite} from '../armdozer-sprite';
import * as THREE from "three";
import type {NeoLandozerModel} from "./model/neo-landozer-model";
import type {NeoLandozerView} from "./view/neo-landozer-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {knockBack} from "./animation/knock-back";
import {knockBackToStand} from "./animation/knock-back-to-stand";
import {guard} from './animation/guard';
import {guardToStand} from './animation/guard-to-stand';
import {avoid} from "./animation/avoid";
import {armHammer} from "./animation/arm-hammer";
import {avoidToStand} from "./animation/avoid-to-stand";
import {charge} from "./animation/charge";
import {hmToStand} from "./animation/hm-to-stand";
import {down} from "./animation/down";

/** ネオランドーザのゲームオブジェクト */
export class NeoLandozer implements ArmDozerSprite {
  _model: NeoLandozerModel;
  _view: NeoLandozerView;
  _subscription: Subscription;

  constructor(params: { view: NeoLandozerView, listener: Observable<GameObjectAction> }) {
    this._model = createInitialValue();
    this._view = params.view;

    this._subscription = params.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /** チャージ */
  charge(): Animate {
    return charge(this._model);
  }

  /** アームハンマー */
  armHammer(): Animate {
    return armHammer(this._model);
  }

  /** アームハンマー -> 立ち */
  hmToStand(): Animate {
    return hmToStand(this._model);
  }

  /** ノックバック */
  knockBack(): Animate {
    return knockBack(this._model);
  }

  /** ノックバック -> 立ち*/
  knockBackToStand(): Animate {
    return knockBackToStand(this._model);
  }

  /** ガード */
  guard(): Animate {
    return guard(this._model);
  }

  /** ガード -> 立ちポーズ */
  guardToStand(): Animate {
    return guardToStand(this._model);
  }

  /** 避け */
  avoid(): Animate {
    return avoid(this._model);
  }

  /** 避け -> 立ち */
  avoidToStand(): Animate {
    return avoidToStand(this._model);
  }

  /** ダウン */
  down(): Animate {
    return down(this._model);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._view.engage(this._model);
  }

  /** レンダリング直前の処理 */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}