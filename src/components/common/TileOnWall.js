import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import { Map, List } from 'immutable'

import TileOnWallBar from './TileOnWallBar';

export default class TileOnWall extends Component {

  render() {
    const {
      zoom,
      item,
      tileList
    } = this.props;
    
    const tile = tileList
      .find(_tile => _tile.get('id') == item.get('tileId'));

    const style = {
      left:   item.get('x') * zoom,
      top:    item.get('y') * zoom,
      width:  tile.get('size').get('w') * zoom,
      height: tile.get('size').get('h') * zoom
    }

    const bars = item.get('bars') || List.of()

    // console.log(bars.toJS())
    // debugger;

    return <div className="tile" style={style}>
      {bars.map((bar, i) => 
        <TileOnWallBar
            key={`tile-on-wall-bar-{$i}`}
            zoom={zoom}
            bar={bar} />
      )}
    </div>
  }
}

TileOnWall.propTypes = {
  item: PropTypes.instanceOf(Map),
  zoom: PropTypes.number,
  tileList: PropTypes.instanceOf(List)
}