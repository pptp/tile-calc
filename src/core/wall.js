import { Map, List } from 'immutable'

export function init() {
  return Map({
    edit: null,
    list: List.of()
  });
}

export function toMapWall(wall) {
  let map = Map();
  map = map.set('size', Map(wall.size));
  map = map.set('id', Map(wall.id));

  let listBar = List.of();
  if (wall.bar) {
    wall.bar.forEach(bar => listBar = listBar.push(Map(bar)));
  }
  map = map.set('bar', listBar);
  return map;
}

export function addWall(state, wall) {
  const iWall = toMapWall(wall);
  return state.update('list', list => list.push(iWall));
}