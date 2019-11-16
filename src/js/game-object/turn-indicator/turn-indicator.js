// @flow

import * as THREE from 'three';
import type {Resources} from "../../resource";
import type {TurnIndicatorModel} from "./model/turn-indicator-model";
import {TurnIndicatorView} from "./view/turn-indicator-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Update} from "../../action/game-loop/update";
import type {PreRender} from "../../action/game-loop/pre-render";
import {invisible} from "./animation/invisible";
import {show} from "./animation/show";
import {Animate} from "../../animation/animate";
import {createInitialValue} from "./model/initial-value";
import {waiting} from "./animation/waiting";
import {filter, take} from "rxjs/operators";

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
};

//TODO AttackDirectionに名前を変更する
/** ターンインジケーター */
export class TurnIndicator {
  _model: TurnIndicatorModel;
  _view: TurnIndicatorView;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._model = createInitialValue();
    this._view = new TurnIndicatorView(param.resources);

    this._subscription = [
      param.listener.subscribe(action => {
        if (action.type === 'Update') {
          this._update(action);
        } else if (action.type === 'PreRender') {
          this._preRender(action);
        }
      }),

      param.listener.pipe(
        filter(v => v.type === 'Update'),
        take(1)
      ).subscribe(action => {
        if (action.type === 'Update') {
          // TODO アニメーションストップを実装する
          waiting(this._model).loop();
        }
      })
    ];
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ターン変更
   *
   * @param isPlayerTurn プレイヤーターンか否かのフラグ、trueでプレイヤーターン
   * @return アニメーション
   */
  turnChange(isPlayerTurn: boolean): Animate {
    return show(isPlayerTurn, this._model);
  }

  /**
   * 非表示にする
   *
   * @return アニメーション
   */
  invisible(): Animate {
    return invisible(this._model);
  }

  /** ターンインジケーターで使うthree.jsオブジェクトを返す */
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
