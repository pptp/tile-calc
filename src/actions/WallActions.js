import {
  ADD_WALL,
  EDIT_WALL,
  REMOVE_WALL,
  ADD_BAR,
  EDIT_BAR,
  REMOVE_BAR,
  SET_TO_EDIT_WALL
} from "./const";


export function setToEditWall(payload) {
  return {type: SET_TO_EDIT_WALL, payload: payload}
}


export function addWall(payload) {
  return {type: ADD_WALL, payload: payload}
}
export function editWall(payload) {
  return {type: EDIT_WALL, payload: payload}
}
export function removeWall(payload) {
  return {type: REMOVE_WALL, payload: payload}
}


export function addBar(payload) {
  return {type: ADD_BAR, payload: payload}
}
export function editBar(payload) {
  return {type: EDIT_BAR, payload: payload}
}
export function removeBar(payload) {
  return {type: REMOVE_BAR, payload: payload}
}
