// @flow

import TWEEN from '@tweenjs/tween.js';
import {Animate} from "../../../../animation/animate";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";

/**
 * ダウン
 *
 * @param model ネオランドーザモデル
 * @return アニメーション
 */
export function down(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.type = 'KNOCK_BACK';
    model.animation.frame = 1;
  }).chain(tween(model.position, t => t
    .to({x: '+70'}, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
  )).chain(
    delay(100)
  ).chain(process(() => {
    model.animation.type = 'DOWN';
    model.animation.frame = 0;
  })).chain(tween(model.animation, t => t
    .to({frame: 1}, 300)
  ));
}