// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/index';
import {createCamera} from "./camera";
import {BatterySelector} from "../../../../game-object/battery-selector";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {createBatterySelector} from "./battery-selector";
import type {OverlapListener} from "../../../../observer/overlap/overlap-listener";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  playerId: PlayerId,
  players: Player[],
  listener: OverlapListener,
  notifier: BattleSceneNotifier
};

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 *
 * @author y.takeuchi
 */
export class HudLayer {
  /** 本レイヤーのベースとなるthree.jsのシーン */
  scene: THREE.Scene;
  /** 本レイヤーのカメラ */
  camera: THREE.OrthographicCamera;
  /** バッテリーセレクタ */
  batterySelector: BatterySelector;

  constructor(param: Param) {
    const playerInfo = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemyInfo = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this.scene = new THREE.Scene();
    this.camera = createCamera();

    this.batterySelector = createBatterySelector(param.resources, param.listener, param.notifier, playerInfo);
    this.scene.add(this.batterySelector.getObject3D());
  }
}