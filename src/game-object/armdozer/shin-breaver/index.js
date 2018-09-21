// @flow

import type {Resources} from "../../../resource/index";
import {ShinBraver} from './shin-breaver';
import {PlayerShinBraverView} from "./view/player-shin-braver-view";
import {EnemyShinBraverView} from "./view/enemy-shin-braver-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

/** プレイヤー側シンブレイバー */
export function PlayerShinBraver(resources: Resources, listener: Observable<GameObjectAction>): ShinBraver {
  const view = new PlayerShinBraverView(resources);
  return new ShinBraver({view, listener});
}

/** 敵側シンブレイバー */
export function EnemyShinBraver(resources: Resources, listener: Observable<GameObjectAction>): ShinBraver {
  const view = new EnemyShinBraverView(resources);
  return new ShinBraver({view, listener});
}