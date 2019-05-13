// @flow
import {Animate} from "../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {shinBraverAttack} from "./shin-braver";
import {neoLandozerAttack} from "./neo-landozer";
import {emptyAttackAnimation} from "./empty-animation";
import type {AttackAnimationParam} from "./animation-param";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import {overWriteAttackerTD} from "./animation-param";

/**
 * 攻撃側スプライトに応じて、戦闘アニメーションを切り替える
 *
 * @param param 戦闘アニメパラメータ
 * @return アニメーション
 */
export function attackAnimation(param: AttackAnimationParam<ArmDozerSprite, BattleResult>): Animate {
  const sprite = param.attackerTD.sprite;
  if (sprite instanceof ShinBraver) {
    return shinBraverAttack(overWriteAttackerTD(param, sprite));
  } else if (sprite instanceof NeoLandozer) {
    return neoLandozerAttack(overWriteAttackerTD(param, sprite))
  }

  return emptyAttackAnimation(param);
}
