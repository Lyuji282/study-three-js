// @flow

import type {Scene} from "../scene";
import type {Resources} from "../../../resource";
import {Observable, Subject, Subscription} from "rxjs";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import type {DOMEvent} from "../../../action/dom-event";
import {TitleView} from "./view";
import type {Render} from "../../../action/game-loop/render";
import type {EndTitle} from "../../../action/game/end-title";
import type {ScreenTouch} from "../../../action/title-scene/title-scene-action";
import type {TitleSceneState} from "./state/title-scene-state";
import {createInitialState} from "./state/initial-state";
import {take} from "rxjs/operators";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  listener: {
    domEvent: Observable<DOMEvent>,
    gameLoop: Observable<GameLoop>
  }
};

/** イベント通知 */
type Notifier = {
  render: Observable<Render>,
  endTitle: Observable<EndTitle>,
};

/** タイトルシーン */
export class TitleScene implements Scene {
  _state: TitleSceneState;
  _view: TitleView;
  _endTitle: Subject<EndTitle>;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._state = createInitialState();
    this._endTitle = new Subject();
    this._view = new TitleView({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      listener: {
        gameLoop: param.listener.gameLoop,
        domEvent: param.listener.domEvent
      }
    });
    this._subscription = [
      this._view.notifier().titleAction.subscribe(action => {
        if (action.type === 'ScreenTouch') {
          this._onScreenTouch(action);
        }
      }),

      param.listener.gameLoop.pipe(
        take(1)
      ).subscribe(action => {
        this._onStart();
      })
    ];
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._view.destructor();
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: this._view.notifier().render,
      endTitle: this._endTitle,
    }
  }

  /** シーン開始 */
  async _onStart(): Promise<void> {
    try {
      const animation = this._view.hud.fader.fadeIn();
      await animation.play();
      this._state.canOperation = true;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 画面タッチの際のイベント
   *
   * @param action アクション
   */
  async _onScreenTouch(action: ScreenTouch): Promise<void> {
    try {
      if (!this._state.canOperation) {
        return;
      }

      this._state.canOperation = false;
      const animation = this._view.hud.fader.fadeOut();
      await animation.play();
      this._endTitle.next({type: 'EndTitle'});
      this._state.canOperation = true;
    } catch (e) {
      throw e;
    }

  }
}