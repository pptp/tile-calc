import {
  SET_TO_EDIT_WALL,
  ADD_WALL,
  EDIT_WALL,
  REMOVE_WALL,
  ADD_BAR,
  EDIT_BAR,
  REMOVE_BAR
} from "../actions/const";

import { List, Map } from 'immutable';
// https://habrahabr.ru/company/mailru/blog/303456/
// https://github.com/gajus/redux-immutable-examples/blob/master/src/app/reducers/tasks.js

const initialState = Map({
  edit: null,
  list: List.of(
    Map({
      size: Map({w: 2500, h: 2200}),
      bar: List.of(
        Map({name: 'hui', x: 250, y: 300, w: 150, h: 150}),
        Map({name: 'pidor', x: 2100, y: 300, w: 150, h: 250})
      )
    }),
    Map({
      size: Map({w: 1500, h: 2200}),
      bar: List.of()
    })
  )
});


function addWall(currentState, wall = {w: 2500, h: 2200}) {
  const newWall = Map({
    size: Map({
      w: wall.w,
      h: wall.h
    }),
    bar: List.of()
  })
  return currentState.update('list', list => list.push(newWall));
}
function setToEditWall(currentState, wall = null) {
  return currentState.update('edit', () => wall)
}
function removeWall(currentState, index) {
  return currentState.update('list', list => list.remove(index));
}
function editWall(currentState, payload) {
  return currentState.update('list', list =>
      list.set(payload.index, payload.wall));
}

function addBar(currentState, wallIndex) {
  // const newBar = Map({ name: bar.name, x: bar.x, y: bar.y, w: bar.w, h: bar.h });
  const newBar = Map({ name: 'new bar', x: null, y: null, w: null, h: null });
  return currentState.update('list', list => {
    const newWall = list.get(wallIndex).update(wall => {
      const newBars = wall.get('bar').push(newBar);
      return wall.set('bar', newBars)
    });
    return list.set(wallIndex, newWall);
  });
}

function editBar(currentState, payload) {
  const { wallIndex, barIndex, bar } = payload;

  return currentState.update('list', list => {
    const newWall = list.get(wallIndex).update(wall => {
      const newBars = wall.get('bar').update(bars => bars.set(barIndex, Map(bar)));
      return wall.set('bar', newBars)
    });
    return list.set(wallIndex, newWall);
  });
}

function removeBar(currentState, payload) {
  const { wallIndex, barIndex } = payload;
  // debugger;
  return currentState.update('list', list => {
    const newWall = list.get(wallIndex).update(wall => {
      const newBars = wall.get('bar').update(bars => bars.delete(barIndex));
      return wall.set('bar', newBars);
    })
    return list.set(wallIndex, newWall);
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


  // switch (action.type) {
  //   case ADD_WALL: return addWall(state, action.payload || {});
  //   case SET_TO_EDIT_WALL: return setToEditWall(state, action.payload);
  //   case REMOVE_WALL: return removeWall(state, action.payload);
  //   case EDIT_WALL: return editWall(state, action.payload);
  //   case ADD_BAR: return addBar(state, action.payload);
  // }

  return state;
}