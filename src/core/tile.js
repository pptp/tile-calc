import { Map, List } from 'immutable'

export function init() {
  return Map({
    edit: null,
    editTile: null,
    list: List.of(
      Map({
        id: 1,
        name: 'adolf',
        size: Map({w: 50, h: 100})
      }),
      Map({
        id: 2,
        name: 'josef',
        size: Map({w: 100, h: 100})
      })
    ),
  });
}

export function addTileToWall(state, payload) {
  const {
    wallIndex: _wallIndex,
    tileId: _tileId,
    count: _count
  } = payload

  const tileEntity = Map({
    tileId: _tileId,
    count: _count
  })

  const updateFn = wall => {
    return wall.update('tileMap', tileMap => {
      if (!tileMap) {
        tileMap = List.of()
      }
      tileMap = tileMap.push(tileEntity)
      return tileMap
    })
  }

  // console.log(state.toJS())

  /*
  return state.update('list', list => 
    list.update(0, wall =>
      wall.update('tileMap', tileMap => 
        tileMap.push(tileEntity))))
  */

  /*
  return state.update('editWall', wall => 
    wall.update('tileMap', tileMap => 
      tileMap.push(tileEntity)))
  */

  
  if (_wallIndex === null) {
    return state.update('editWall', updateFn)
  } else {
    return state.update('list', list => list.update(_wallIndex, updateFn))
  }

}

export function removeTileFromWall(state, payload) {
  const {
    wallIndex: _wallIndex,
    tileIndex: _tileIndex
  } = payload

  const removeFn = wall =>
    wall.update('tileMap', tileMap => tileMap.delete(_tileIndex))

  if (_wallIndex === null) {
    state = state.update('editWall', removeFn)
  } else {
    state = state.update('list', list => {
      return list.update(_wallIndex, removeFn)
    })
  }

  return state
}