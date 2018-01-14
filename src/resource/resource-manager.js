// @flow
import type {TileMapResource} from "./tile-map";
import {loadAllTileMap} from "./tile-map";
import type {TextureResource} from "./texture";
import {loadAllTexture} from "./texture";
import type {JsonModelResource} from "./json-model";
import {loadAllJsonModel} from "./json-model";
import type {CanvasImageResource} from "./canvas-image";
import {loadAllCanvasImage} from "./canvas-image";

/**
 * ゲームで使うリソースを集めたもの
 */
export type Resources = {
  /** モデル */
  models: JsonModelResource[],
  /** テクスチャ */
  textures: TextureResource[],
  /** キャンバス用画像 */
  canvasImages: CanvasImageResource[],
  /** タイルマップ */
  tileMap: TileMapResource[],
};

/**
 * リソース管理クラス
 */
export class ResourceManager {
  /** リソース管理オブジェクト */
  resources: Resources;
  /**
   * リソースのベースとなるパス
   * 本クラスを呼び出したファイルからresourcesフォルダの相対パスを指定する
   */
  basePath: string;

  constructor(basePath: string = '') {
    this.resources = {
      models: [],
      textures: [],
      canvasImages: [],
      tileMap: [],
    };
    this.basePath = basePath;
  }

  /** ゲームのリソースを全て読み込む */
  async load() {
    const tileMap = loadAllTileMap();
    const [models, textures, canvasImages] = await Promise.all([
      loadAllJsonModel(this.basePath),
      loadAllTexture(this.basePath),
      loadAllCanvasImage(this.basePath),
    ]);
    this.resources = {models, textures, tileMap, canvasImages};
  }
}