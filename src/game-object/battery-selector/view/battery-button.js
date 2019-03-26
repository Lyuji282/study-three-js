// @flow

import * as THREE from 'three';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";

export const MESH_SIZE = 512;

// TODO 当たり判定を追加する
/** バッテリーボタン */
export class BatteryButton {
  _mesh: SimpleImageMesh;

  constructor(resources: Resources) {
    const imageResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_BUTTON);
    const image = imageResource
      ? imageResource.image
      : new Image();

    this._mesh = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: image
    });
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }
}