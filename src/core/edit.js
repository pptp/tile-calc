export function setToEditWall(state, payload) {
  const { wallIndex: _wallIndex } = payload;
  const _editWall = state.get('list').get(_wallIndex);

  state = state.update('edit', () => _wallIndex)
  state = state.update('editWall', () => _editWall)

  return state
}

export function cancelEditWall(state, payload) {
  state = state.update('edit', () => null)
  state = state.update('editWall', () => null)

  return state
}


export function setToEditTile(state, payload) {
  const { tileIndex: _tileIndex } = payload;
  const _tile = state.get('list').get(_tileIndex)

  state = state.update('edit', () => _tileIndex)
  state = state.update('editTile', () => _tile)

  return state
}

// export function cancelEditWall(state, payload) {
//   return state.update('edit', () => null)
// }