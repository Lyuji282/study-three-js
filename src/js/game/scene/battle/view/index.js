// @flow
import type {Resources} from '../../../../resource';
import {ThreeDimensionLayer} from './td';
import {HudLayer} from './hud';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import {merge, Observable, Subject} from "rxjs";
import type {DOMEvent} from "../../../../action/dom-event";
import type {BattleSceneAction} from "../../../../action/battle-scene";
import type {Render} from "../../../../action/game-loop/render";
import TWEEN from "@tweenjs/tween.js";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>,
  }
};

/** 戦闘シーンビューのイベント通知 */
type Notifier = {
  render: Observable<Render>,
  battleAction: Observable<BattleSceneAction>,
};

/**
 * 戦闘画面のビュー
 */
export class BattleSceneView {
  td: ThreeDimensionLayer;
  hud: HudLayer;

  _gameLoop3D: Subject<GameLoop>;
  _gameLoopHUD: Subject<GameLoop>;

  constructor(param: Param) {
    this._gameLoop3D = new Subject();
    this._gameLoopHUD = new Subject();

    this.td = new ThreeDimensionLayer({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      playerId: param.playerId,
      players: param.players,
      listener: {
        domEvent: param.listener.domEvent,
        gameLoop: this._gameLoop3D
      }
    });

    this.hud = new HudLayer({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      playerId: param.playerId,
      players: param.players,
      listener: {
        domEvent: param.listener.domEvent,
        gameLoop: this._gameLoopHUD,
      }
    });

    param.listener.gameLoop.subscribe(action => {
      this._gameLoop(action);
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.hud.destructor();
    this.td.destructor();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: merge(
        this.hud.notifier().render,
        this.td.notifier().render
      ),
      battleAction: this.hud.notifier().battleAction,
    };
  }

  /** ゲームループ */
  _gameLoop(action: GameLoop): void {
    TWEEN.update(action.time);
    this._gameLoop3D.next(action);
    this._gameLoopHUD.next(action);
  }
}
