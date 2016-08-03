import {
  SET_TO_EDIT_WALL,
  CANCEL_EDIT_WALL,

  ADD_WALL,
  EDIT_WALL,
  REMOVE_WALL,
  
  ADD_BAR,
  EDIT_BAR,
  REMOVE_BAR,

  ADD_TILE_TO_WALL,
  REMOVE_TILE_FROM_WALL
} from "../actions/const";

import { Map } from 'immutable';
import { init, addWall, editWall, removeWall } from '../core/wall'
import { addBar, editBar, removeBar } from '../core/bars'
import { setToEditWall, cancelEditWall } from '../core/edit'
import { addTileToWall, removeTileFromWall } from '../core/tile'

const initialState = init();

export default function walls(state = initialState, action) {
  const callbacks = {
    SET_TO_EDIT_WALL:       setToEditWall,
    CANCEL_EDIT_WALL:       cancelEditWall,

    ADD_WALL:               addWall,
    EDIT_WALL:              editWall,
    REMOVE_WALL:            removeWall,
    
    ADD_BAR:                addBar,
    EDIT_BAR:               editBar,
    REMOVE_BAR:             removeBar,

    ADD_TILE_TO_WALL:       addTileToWall,
    REMOVE_TILE_FROM_WALL:  removeTileFromWall
  };

  const callback = callbacks[action.type]
  if (callback) {
    return callback.call(this, state, action.payload);
  }

  return state;
}