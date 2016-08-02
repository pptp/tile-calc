import {
  SET_TO_EDIT_TILE,
} from "./const"

export function setToEditTile(payload) {
  return {type: SET_TO_EDIT_TILE, payload: payload}
}