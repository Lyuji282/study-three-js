// @flow

import test from 'ava';
import type {BatterySelectorModel} from "../../../../../src/game-object/battery-selector/model";
import {EMPTY_BATTERY_SELECTOR} from "../../../../data/battery-selector-model";
import {isBatteryMinusDisabled} from "../../../../../src/game-object/battery-selector/model/is-battery-minus-disabled";

test('バッテリーが0以下ならtrueを返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 0,
  };
  const result = isBatteryMinusDisabled(data);
  t.is(result, true);
});

test('バッテリーが0より大きければfalseを返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 3,
  };
  const result = isBatteryMinusDisabled(data);
  t.is(result, false);
});