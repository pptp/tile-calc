export function setToEditWall(state, payload) {
  const { wallIndex: _wallIndex } = payload;

  return state.update('edit', () => _wallIndex)
}

export function cancelEditWall(state, payload) {
  return state.update('edit', () => null)
}


export function setToEditTile(state, payload) {
  const { tileIndex: _tileIndex } = payload;

  return state.update('edit', () => _tileIndex)
}

// export function cancelEditWall(state, payload) {
//   return state.update('edit', () => null)
// }