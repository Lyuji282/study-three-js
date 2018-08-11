// @flow

import {BattleSceneView} from "../../view/index";
import type {MouseMove} from "../../../../observer/dom-event/action/mouse-move";
import type {BattleSceneState} from "../../state";
import type {MouseRaycaster} from "../../../../overlap/check/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../../../overlap/check/mouse/mouse-raycaster";
import {isMouseLeftButtonPushed} from "../../../../mouse/mouse-left-button";

/** ゲーム画面をマウスムーブした際のイベント */
export function mouseMove(view: BattleSceneView, state: BattleSceneState, action: MouseMove) {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
  const isLeftButtonPushed = isMouseLeftButtonPushed(action.event);
}