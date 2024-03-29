// @flow

import type {BurstButtonModel} from "./burst-button-model";

export function createInitialValue(): BurstButtonModel {
  return {
    opacity: 0,
    disabled: false,
    canBurst: false,
  }
}