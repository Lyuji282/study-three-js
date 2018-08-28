// @flow

import {loadServiceWorker} from "../service-worker/load-service-worker";
import {createRender} from "../render/renderer";
import {bindDom} from "../render/bind-dom";
import {loadAllResource} from "../resource";
import {createBattleScene} from "./create-battle-scene";
import {createGameLoopListener} from "../action/game-loop/create-listener";
import {createDOMEventListener} from "../action/dom-event/create-listener";
import Tween from '@tweenjs/tween.js';

export async function main() {
  loadServiceWorker();

  const resources = await loadAllResource('');

  const renderer = createRender();
  bindDom(renderer);

  const gameLoopListener = createGameLoopListener();
  const domEventListener = createDOMEventListener(renderer.domElement);

  const scene = createBattleScene({
    resources,
    gameLoopListener,
    domEventListener,
    renderer
  });

  gameLoopListener.subscribe(time => {
    Tween.update();
  });
}
