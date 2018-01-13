// @flow

import type {TileMap, TileSet} from "../../flow-typed/tiled";
import SCHOOL_GROUND_TILE_MAP from '../../../resources/tile-map/school-ground/tile-data.json';
import SCHOOL_GROUND_TILE_SET from '../../../resources/tile-map/school-ground/map.json';

/** タイルマップID */
export type TileMapId = string;

/** タイルマップデータ */
export type TileMapManager = {
  /** タイルマップID */
  id: TileMapId,
  /** マップ */
  tileMap: TileMap,
  /** タイルセット */
  tileSet: TileSet,
};

/** タイルマップIDを集めたもの */
export const TILE_MAP_IDS: {[string]: TileMapId} = {
  SCHOOL_GROUND: 'SCHOOL_GROUND'
};

/**
 * タイルマップのデータを全て読み込む
 * webpackではjsonファイルのimportが可能なので、
 * jsonの読み込み処理は行わずimportしたjsonをそのまま返している
 *
 * @return 読み込み結果
 */
export function loadAllTileMap(): TileMapManager[] {
  return [{
    id: TILE_MAP_IDS.SCHOOL_GROUND,
    tileMap: SCHOOL_GROUND_TILE_MAP,
    tileSet: SCHOOL_GROUND_TILE_SET
  }];
}
