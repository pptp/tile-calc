import {
  SET_TO_EDIT_TILE
} from "../actions/const"

import { List, Map } from 'immutable';

import { init } from '../core/tile'
import { setToEditTile } from '../core/edit'

const initialState = init();

export default function tiles(state = initialState, action) {
  const callbacks = {
    SET_TO_EDIT_TILE: setToEditTile,
  };

  const callback = callbacks[action.type]
  if (callback) {
    return callback.call(this, state, action.payload);
  }

  return state;
}