//@flow

import type {Resources,} from '../resource/resource-manager';
import * as THREE from 'three';
import {createCanvasMesh} from '../mesh/mesh-creator';
import {PlayerHpGauge, EnemyHpGauge} from '../canvas/draw/hp-gauge';
import {PlayerBatteryGauge, EnemyBatteryGauge} from '../canvas/draw/battery-gauge';
import {drawPlayerGuge} from './player-gauge';
import {drawEnemyGuge} from './enemy-gauge';

/** キャンバス幅 */
export const CANVAS_WIDTH = 256;
/** キャンバス高 */
export const CANVAS_HEIGHT = 256;
/** メッシュ幅 */
export const MESH_WIDTH = 300;
/** メッシュ高 */
export const MESH_HEIGHT = 300;

/**
 * ゲージ系クラスで共通となるもの
 */
class BasicGauge {
  /** リソース管理クラス */
  resources: Resources;

  /** メッシュ */
  mesh: THREE.Mesh;

  /** 描画を行うキャンバス */
  canvas: HTMLCanvasElement;

  constructor(resources: Resources) {
    this.resources = resources;
    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.mesh = createCanvasMesh(this.canvas, MESH_WIDTH, MESH_HEIGHT);
  }
}

/**
 * プレイヤーのゲージ
 */
export class PlayerGauge extends BasicGauge {

  constructor(resources: Resources) {
    super(resources);
  }

  /** ゲージをリフレッシュする */
  refresh() {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawPlayerGuge({
      context,
      resources: this.resources,
      hp: 2500,
      maxHp: 3000,
      battery: 4
    });
  }
}

/**
 * 敵のゲージ
 */
export class EnemyGauge extends BasicGauge {
  constructor(resources: Resources) {
    super(resources);
  }

  /** ゲージをリフレッシュする */
  refresh() {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawEnemyGuge({
      context,
      resources: this.resources,
      hp: 1500,
      maxHp: 3200,
      battery: 2
    });
  }
}