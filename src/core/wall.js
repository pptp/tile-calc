import { Map, List } from 'immutable'

export function init() {
  return Map({
    edit: null,
    list: List.of(
      Map({
        size: Map({ w: 1000, h: 2000}),
        bar: List.of(
          // Map({ name: 'hui', x: 2, y: 2, h: 1, w: 3})
        )
      })
    )
  });
}

export function toMapWall(_wall) {
  let map = Map();
  map = map.set('size', Map(_wall.size));

  let listBar = List.of();
  if (_wall.bar) {
    _wall.bar.forEach(bar => listBar = listBar.push(Map(bar)));
  }
  map = map.set('bar', listBar);
  return map;
}

export function addWall(state, payload) {
  let { wall: _wall} = payload;
  const _iWall = toMapWall(_wall);
  return state.update('list', list => list.push(_iWall));
}

export function editWall(state, payload) {
  const { wall: _wall, wallIndex: _wallIndex } = payload;
  return state.update('list', list =>
    list.update(_wallIndex, wall => wall.mergeDeep(_wall)));
}

export function removeWall(state, payload) {
  const { wallIndex: _wallIndex} = payload;
  return state.update('list', list => list.delete(_wallIndex));
}