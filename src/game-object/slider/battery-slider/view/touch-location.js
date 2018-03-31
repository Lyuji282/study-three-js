// @flow
import * as THREE from "three";
import * as R from 'ramda';

/**
 * メータの当たり判定
 * 本クラスは当たり判定用なので、画面上に表示されることはない
 */
type Meter = {
  /** 当たり判定用のメッシュ */
  mesh: THREE.Mesh,
  /** 当たり判定オブジェクトにタッチした際のスライダー値 */
  value: number
};

/** コンストラクタのパラメータ */
type Param = {
  /** 当たり判定全体の幅 */
  width: number,
  /** 当たり判定全体の高さ */
  height: number,
  /** スライダー開始値 */
  start: number,
  /** スライダー終了値 */
  end: number,
};

/**
 * バッテリースライダーの当たり判定用オブジェクト
 * 本クラスは当たり判定用なので、画面上に表示されることはない
 */
export class TouchLocation {
  /** メータ当たり判定を集めたもの */
  _meterList: Meter[];

  constructor(param: Param) {
    const start = Math.floor(param.start);
    const end = Math.floor(param.end);
    const division = Math.abs(end - start);
    const meshWidth = param.width / division;

    this._meterList = R.range(start, end)
      .map((value, index) => ({
        mesh: createMeterMesh(meshWidth, param.height, index * meshWidth, 0, new THREE.Color(`rgb(0, ${255 * index/division}, 0)`)),
        value
      }));
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._meterList.map((meter: Meter) => meter.mesh);
  }
}

/**
 * メータ当たり判定用のメッシュを生成する
 *
 * @param width メッシュ幅
 * @param height メッシュ高
 * @param dx 描画位置X
 * @param dy 描画位置Y
 * @param color メッシュ色（デバッグ用に使う）
 * @return メータ当たり判定用メッシュ
 */
function createMeterMesh(width: number, height: number, dx: number, dy: number, color: number): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
  const material = new THREE.MeshBasicMaterial({color});
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = dx;
  mesh.position.y = dy;
  return mesh;
}