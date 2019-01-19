// @flow

import type {ArmdozerMesh} from "../../mesh/armdozer-mesh";
import type {Resources} from "../../../../resource/index";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {HorizontalAnimationMesh} from "../../mesh/horizontal-animation-mesh";

export const MAX_ANIMATION = 4;
export const MESH_WIDTH = 750;
export const MESH_HEIGHT = 750;

/** ネオラインドーザ ストレートパンチアタック */
export function neoLandozerSPAttack(resources: Resources): ArmdozerMesh {
  const ret = new HorizontalAnimationMesh({
    id: TEXTURE_IDS.NEO_LANDOZER_SP_ATTACK,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  ret.mesh.position.y = 135;
  return ret;
}
