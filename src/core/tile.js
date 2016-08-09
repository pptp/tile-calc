import { Map, List } from 'immutable'

export function init() {
  return Map({
    edit: null,
    editTile: null,
    list: List.of(
      Map({
        id: 1,
        name: 'adolf',
        size: Map({w: 150, h: 300})
      }),
      Map({
        id: 2,
        name: 'josef',
        size: Map({w: 300, h: 300})
      })
    ),
  });
}

export function updateTiles(state, payload) {
  const {
    tileList: _tileList,
  } = payload

  const calcBars = (x, y, w, h, barList) => {
    let bars = List.of()
    return bars
  }

  const isAvailable = (x, y, w, h, barList) => {
    const x1 = +x;
    const y1 = +y;
    const x2 = +x + +w;
    const y2 = +y + +h;

    const S = barList.reduce((_s, bar) => {
      bar = bar.toJS()
      
      const x3 = +bar.x;
      const y3 = +bar.y;
      const x4 = +bar.x + +bar.w;
      const y4 = +bar.y + +bar.h;
      
      if (y3 > y2 || y4 < y1 || x3 > x2 || x4 < x1) {
        return _s;
      }

      const x11 = Math.max(x1, x3);
      const x12 = Math.min(x2, x4);
      const y11 = Math.max(y1, y3);
      const y12 = Math.min(y2, y4);

      if ((x12 > x11) && (y12 > y11)) {
        _s -= (x12 - x11) * (y12 - y11)
      }

      return _s
    }, w * h)

    // console.log(S)

    // return true;
    return S > 0
  }

  return state.update('editWall', wall => 
    wall.update('tiles', () => {
      let tiles = List.of()
      const wallSize = wall.get('size')

      const tileMap = wall.get('tileMap')
      tileMap.reduce((level, row) => {
        const tile = _tileList.find(_tile => _tile.get('id') == row.get('tileId'))
        const tileSize = tile.get('size')

        let nextLevel = level

        for (let rowI = 0; rowI < row.get('count'); rowI++) {
          nextLevel += tile.get('size').get('h')

          const y = wallSize.get('h') - nextLevel;

          for (let x = 0; x < wallSize.get('w'); x += tileSize.get('w')) {
            // const barsEntities = List.of()
            const available = isAvailable(
                x, y, tileSize.get('w'), tileSize.get('h'),
                wall.get('bar'))

            if (available) {
              const barsEntities = calcBars(
                  x, y, tileSize.get('w'), tileSize.get('h'),
                  wall.get('bar'))

              const tileEntity = Map({
                tileId: tile.get('id'),
                x: x,
                y: y,
                bars: barsEntities
              })
              tiles = tiles.push(tileEntity)
            }
          }
        }
        return nextLevel;
      }, 0)
      console.log("Tiles Count: ", tiles.size)
      return tiles
    })
  )
}

export function addTileToWall(state, payload) {
  const {
    tileList: _tileList,
    tileId: _tileId,
    count: _count
  } = payload

  let tileEntity = Map({
    tileId: _tileId,
    count: _count
  })

  const updateFn = wall => {
    return wall.update('tileMap', tileMap => {
      if (!tileMap) {
        tileMap = List.of()
      }
      const last = tileMap.last()
      if (last && last.get('tileId') == tileEntity.get('tileId')) {
        tileEntity = tileEntity.update('count',
          count => count + last.get('count'))
        tileMap = tileMap.pop()
      }
      tileMap = tileMap.push(tileEntity)
      return tileMap
    })
  }

  state = state.update('editWall', updateFn)
  // state = state.update('editWall', updateTilesFabric(_tileList))

  return state
}

export function removeTileFromWall(state, payload) {
  const {
    tileList: _tileList,
    tileIndex: _tileIndex
  } = payload

  const removeFn = wall =>
    wall.update('tileMap', tileMap => tileMap.delete(_tileIndex))

  state = state.update('editWall', removeFn)
  // state = state.update('editWall', updateTilesFabric(_tileList))

  return state
}