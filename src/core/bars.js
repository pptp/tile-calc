import { Map, List } from 'immutable'

export function init() {
  return toMapBar({name: 'unnamed bar', x: 0, y: 0, w: 0, h: 0});
}

export function toMapBar(bar) {
  return Map(bar);
}

export function addBar(state, payload) {
  const { wallIndex: _wallIndex } = payload;
  let { bar: _bar } = payload;

  _bar = init().mergeDeep(toMapBar(_bar))

  return state.update('list', list =>
    list.update(_wallIndex, wall =>
      wall.update('bar',
        bars => bars.push(_bar))));
}

export function editBar(state, payload) {
  const {
    wallIndex: _wallIndex,
    barIndex: _barIndex,
    bar: _bar
  } = payload

  return state.update('list', list =>
    list.update(_wallIndex, wall =>
      wall.update('bar',
        bars => bars.update(_barIndex, bar => bar.mergeDeep(_bar))
    )));
}

export function removeBar(state, payload) {
  const {
    wallIndex: _wallIndex,
    barIndex: _barIndex
  } = payload

  return state.update('list', list =>
    list.update(_wallIndex, wall =>
      wall.update('bar',
        bars => bars.delete(_barIndex)
    )));
}