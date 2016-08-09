require('../../../styles/tile-leveler.less')

import { List, Map } from 'immutable'

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import TileLevelerItem from './TileLevelerItem'

export default class TileLeveler extends Component {

  getTileById(id) {
    const tileList = this.props.tileList.toJS()
    return tileList.find(tile => tile.id == id)
  }

  render() {
    const {
      zoom,
      wall,
      wallIndex,
      actions,
      tileList,
      height
    } = this.props

    const tileMap = wall.get('tileMap') || List.of()

    let sumHeight = 0;
    const maxHeight = wall.get('size').get('h') * zoom;

    return <div className="tile-leveler" style={{height:height}}>
      {tileMap.map((tileLevel, i) => {
        const tile = this.getTileById(tileLevel.get('tileId'))
        const count = tileLevel.get('count')
        let height = tile.size.h * count * zoom
        sumHeight += height;
        // height = Math.min(maxHeight, sumHeight) - sumHeight
        height -= Math.max(0, sumHeight - maxHeight)

        return <TileLevelerItem 
            key={'tile-leveler-item-' + i}
            zoom={zoom}
            height={height}
            count={count}
            actions={actions}
            tileIndex={i}
            wallIndex={wallIndex}
            tileList={tileList}
            tile={tile}
          />
        }
      )}
    </div>
  }
}

TileLeveler.propTypes = {
  wall: PropTypes.instanceOf(Map),
  zoom: PropTypes.number,
  tileList: PropTypes.instanceOf(List),
  actions: PropTypes.object,
  wallIndex: PropTypes.number
}