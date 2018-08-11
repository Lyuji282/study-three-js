// @flow

import {BattleSceneView} from "../../view/index";
import type {BattleSceneState} from "../../state";
import type {PushAttackButton} from "../../../../observer/battle-scene/action/push-attack-button";

/** コウゲキボタンを押した際のイベント */
export function pushAttackButton(view: BattleSceneView, state: BattleSceneState, action: PushAttackButton): void {
  console.log('push attack button');
}