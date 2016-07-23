import { combineReducers } from 'redux';
import walls from "./walls";
import tiles from "./tiles";
import {reducer as formReducer} from 'redux-form';


const reducers = {
  walls, tiles,
  form: formReducer
};
module.exports = combineReducers(reducers);
