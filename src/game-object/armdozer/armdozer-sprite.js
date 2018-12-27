// @flow

import * as THREE from "three";
import {Animate} from "../../animation/animate";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /** 立ちポーズにする */
  stand(): Animate;

  /** ノックバックアニメーションを再生する */
  knockBack(): Animate;
}