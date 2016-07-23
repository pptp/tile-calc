import {
  SET_TO_EDIT_WALL,
  ADD_WALL,
  EDIT_WALL,
  REMOVE_WALL,
  ADD_BAR,
  EDIT_BAR,
  REMOVE_BAR
} from "../actions/const";

import { Map } from 'immutable';
// https://habrahabr.ru/company/mailru/blog/303456/
// https://github.com/gajus/redux-immutable-examples/blob/master/src/app/reducers/tasks.js

const initialState = Map({
  edit: null,
  list: [
    {
      size: {w: 2500, h: 2200},
      bar: [
        {name: 'hui', x: 250, y: 300, w: 150, h: 150},
        {name: 'pidor', x: 2100, y: 300, w: 150, h: 250}
      ]
    },
    {
      size: {w: 1500, h: 2200},
      bar: []
    }
  ]
});


function addWall(currentState, wall = {w: 2500, h: 2200}) {
  const newWall = {
    size: {
      w: wall.w,
      h: wall.h
    },
    bar: []
  }
  return currentState.update('list', list => list.push(newWall));
}
  
function setToEditWall(currentState, wall = null) {
  return currentState.update('edit', () => wall)
}

function removeWall(currentState, index) {
  // return currentState.update('list', list => list.remove(index));
  return currentState.update('list', list => list.splice(index, 1));
}

function editWall(currentState, payload) {
  const wallIndex = payload.index;
  const wallData = payload.wall;

  return currentState.update('list', list => {
    list[wallIndex] = Object.assign(list[wallIndex], wallData);
    return list;
  });
}

function addBar(currentState, wallIndex) {
  const newBar = Map({ name: 'new bar', x: null, y: null, w: null, h: null });

  return currentState.update('list', list => {
    list[wallIndex].bars.push(newBar);
    return list;
  });
}

function editBar(currentState, payload) {
  const { wallIndex, barIndex, bar } = payload;

  return currentState.update('list', list => {
    list[wallIndex].bar[barIndex] = bar;
    return list;
  });
}


function removeBar(currentState, payload) {
  const { wallIndex, barIndex } = payload;

  return currentState.update('list', list => {
    list[wallIndex].bar.splice(barIndex, 1);
    return list;
  });
}

export default function walls(state = initialState, action) {
  const callbacks = {
    ADD_WALL:         addWall,
    SET_TO_EDIT_WALL: setToEditWall,
    REMOVE_WALL:      removeWall,
    EDIT_WALL:        editWall,
    ADD_BAR:          addBar,
    EDIT_BAR:         editBar,
    REMOVE_BAR:       removeBar,
  };

  const callback = callbacks[action.type]
  if (callback) {
    return callback.call(this, state, action.payload);
  }

  return state;
}