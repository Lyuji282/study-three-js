// @flow
import ThreeLib from 'three-js';
import * as CONST from './const';
import {ResourceManager} from './resource-manager';
import SchoolField from './field/school-field';


const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;
let schoolField: SchoolField = null;

/**
 * コントローラを生成して返す
 *
 * @return コントローラ
 */
function Controllers(camera: THREE.Camera, renderer: THREE.WebGLRenderer): THREE.OrbitControls{
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI * 0.48;
  return controls;
}

/**
 * 初期化
 */
function init(): void {
  // リソース管理
  const resourceManager:  ResourceManager = new ResourceManager();
  Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures()
  ]).then(() => {
    schoolField = new SchoolField(resourceManager.resources);
    schoolField.values().forEach(item => scene.add(item));
  });

  // シーン
  scene = new THREE.Scene();

  // カメラ
  camera = new THREE.PerspectiveCamera( 75, CONST.SCREEN_WIDTH / CONST.SCREEN_HEIGHT, 1, 10000 );
  camera.position.z = 1000;

  // レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( CONST.SCREEN_WIDTH, CONST.SCREEN_HEIGHT );

  // コントローラー
  Controllers(camera, renderer);

  // 軸
  scene.add(new THREE.AxisHelper(1000));

  document.body.appendChild( renderer.domElement );
}

/**
 * ゲームループ
 */
function animate(): void {
  requestAnimationFrame( animate );

  schoolField && schoolField.animate(camera);

  renderer.render( scene, camera );
}

(function(){
  init();
  animate();
})();