import {
  SET_TO_EDIT_TILE,

  ADD_TILE_TO_WALL,
  REMOVE_TILE_FROM_WALL
} from "./const"

export function setToEditTile(payload) {
  return {type: SET_TO_EDIT_TILE, payload: payload}
}

export function addTileToWall(payload) {
  return {type: ADD_TILE_TO_WALL, payload: payload}
}
export function removeTileFromWall(payload) {
  return {type: REMOVE_TILE_FROM_WALL, payload: payload}
}