import { combineReducers } from 'redux';
import walls from "./walls";
import tiles from "./tiles";

const reducers = {
  walls, tiles
};
module.exports = combineReducers(reducers);
