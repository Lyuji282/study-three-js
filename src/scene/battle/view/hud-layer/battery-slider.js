// @flow

import type {Resources} from "../../../../resource";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";
import {BatterySelector} from "../../../../game-object/battery-selector";
import type {Player} from "gbraver-burst-core/lib/player/player";
import type {RaycasterListener} from "../../../../observer/raycaster/raycaster-listener";

/** バッテリーセレクタを生成する */
export function createBatterySelector(resources: Resources, listener: RaycasterListener, notifier: BattleSceneNotifier, playerInfo: Player): BatterySelector {
  return new BatterySelector({
    raycasterListener: listener,
    maxBattery: playerInfo.armdozer.maxBattery,
    resources: resources,
    onBatteryChange: (battery: number) => console.log(battery),
  });
}