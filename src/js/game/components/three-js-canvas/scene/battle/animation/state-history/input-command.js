// @flow

import {Animate} from "../../../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {InputCommand} from "gbraver-burst-core/lib/effect/input-command/input-command";
import {getEnableMax, getInitialBattery} from "../../ui-logic/battery-selector";
import {delay, empty} from "../../../../../../../animation/delay";
import {all} from "../../../../../../../animation/all";
import {canBurstButtonPush} from "../../ui-logic/burst-button";
import {toInitial} from "../td-camera";

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param view 戦闘画面ビュー
 * @param sceneState 戦闘画面状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function inputCommandAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'InputCommand') {
    return empty();
  }

  const effect: InputCommand = gameState.effect;
  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
  const playerCommand = effect.players.find(v => v.playerId === sceneState.playerId);
  const playerTD = view.td.players.find(v => v.playerId === sceneState.playerId);
  const playerHUD = view.hud.players.find(v => v.playerId === sceneState.playerId);
  const enemy = gameState.players.find(v => v.playerId !== sceneState.playerId);
  const enemyTD = view.td.players.find(v => v.playerId !== sceneState.playerId);
  const enemyHUD = view.hud.players.find(v => v.playerId !== sceneState.playerId);
  if (!player || !playerCommand || !playerTD || !playerHUD || !enemy || !enemyHUD || !enemyTD) {
    return empty();
  }

  if (playerCommand.selectable === false) {
    return empty();
  }

  const isPlayerTurn = sceneState.playerId === gameState.activePlayerId;
  const enableMax = getEnableMax(playerCommand.command);
  const initialValue = getInitialBattery(enableMax);
  const okButtonLabel = isPlayerTurn ? 'Attack' : 'Defense';
  const canBurst = canBurstButtonPush(playerCommand.command);
  return all(
    toInitial(view.td.camera, 500),

    delay(800).chain(all(
      playerHUD.gauge.hp(player.armdozer.hp),
      playerHUD.gauge.battery(player.armdozer.battery),
      enemyHUD.gauge.hp(enemy.armdozer.hp),
      enemyHUD.gauge.battery(enemy.armdozer.battery),
      view.td.gameObjects.turnIndicator.turnChange(isPlayerTurn),
      view.hud.gameObjects.batterySelector.open(initialValue, enableMax, okButtonLabel),
      view.hud.gameObjects.burstButton.open(canBurst),
    ))
  );
}