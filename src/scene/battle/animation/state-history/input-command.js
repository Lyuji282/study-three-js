// @flow

import {Animate} from "../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {InputCommand} from "gbraver-burst-core/lib/effect/input-command/input-command";
import {getEnableMax, getInitialBattery} from "../../ui-logic/battery-selector";
import {delay, empty} from "../../../../animation/delay";
import {all} from "../../../../animation/all";

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param view 戦闘画面ビュー
 * @param sceneState 戦闘画面状態
 * @param gameState ゲーム状態
 * @param effect コマンド入力フェイズの効果
 * @return アニメーション
 */
export function inputCommandAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: InputCommand): Animate {
  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
  const enemy = gameState.players.find(v => v.playerId !== sceneState.playerId);
  if (!player || !enemy) {
    return empty();
  }

  return empty();

  // const isPlayerTurn = sceneState.playerId === gameState.activePlayerId;
  // const enableMax = getEnableMax(effect, sceneState.playerId);
  // const initialValue = getInitialBattery(enableMax);
  // const okButtonLabel = isPlayerTurn ? 'Attack' : 'Defense';
  //
  // const {playerGauge, enemyGauge, turnIndicator, playerSprite, enemySprite} = view.tdLayer;
  // const {batterySelector, burstButton} = view.hudLayer;
  //
  // return empty()
  //   .chain(
  //     all(
  //       delay(500),
  //       playerGauge.hp(player.armdozer.hp),
  //       playerGauge.battery(player.armdozer.battery),
  //       enemyGauge.hp(enemy.armdozer.hp),
  //       enemyGauge.battery(enemy.armdozer.battery),
  //       turnIndicator.turnChange(isPlayerTurn),
  //       batterySelector.open(initialValue, enableMax, okButtonLabel),
  //       burstButton.visible()
  //     )
  //   );
}