import {
  ADD_WALL,
  EDIT_WALL,
  REMOVE_WALL,
  ADD_BAR,
  EDIT_BAR,
  REMOVE_BAR,
  SET_TO_EDIT_WALL,
  CANCEL_EDIT_WALL,
  SAVE_WALL,

  UPDATE_TILES,
} from "./const";


export function setToEditWall(payload) {
  return {type: SET_TO_EDIT_WALL, payload: payload}
}
export function cancelEditWall(payload) {
  return {type: CANCEL_EDIT_WALL, payload: payload}
}


export function addWall(payload) {
  return dispatch => {
    dispatch({type: ADD_WALL, payload: payload});
    // dispatch({type: UPDATE_TILES, payload: payload});
  }
  // return {type: ADD_WALL, payload: payload}
}
export function editWall(payload) {
  return dispatch => {
    dispatch({type: EDIT_WALL, payload: payload});
    dispatch({type: UPDATE_TILES, payload: payload});
  }
  // return {type: EDIT_WALL, payload: payload}
}
export function removeWall(payload) {
  return dispatch => {
    dispatch({type: REMOVE_WALL, payload: payload});
    // dispatch({type: UPDATE_TILES, payload: payload});
  }
  // return {type: REMOVE_WALL, payload: payload}
}


export function addBar(payload) {
  return dispatch => {
    dispatch({type: ADD_BAR, payload: payload});
    dispatch({type: UPDATE_TILES, payload: payload});
  }
  // return {type: ADD_BAR, payload: payload}
}
export function editBar(payload) {
  return dispatch => {
    dispatch({type: EDIT_BAR, payload: payload});
    dispatch({type: UPDATE_TILES, payload: payload});
  }
  // return {type: EDIT_BAR, payload: payload}
}
export function removeBar(payload) {
  return dispatch => {
    dispatch({type: REMOVE_BAR, payload: payload});
    dispatch({type: UPDATE_TILES, payload: payload});
  }
  // return {type: REMOVE_BAR, payload: payload}
}

export function saveWall(payload) {
  return {type: SAVE_WALL, payload: payload}
}