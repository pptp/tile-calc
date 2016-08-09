require('../../styles/wall.less');

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import Bar from './Bar'
import TileOnWall from './TileOnWall'
import { Map, List } from 'immutable'

export default class Wall extends Component {

  render() {
    const originalSize = this.props.wall.get('size');
    const bars = this.props.wall.get('bar') || List.of();
    const tiles = this.props.wall.get('tiles') || List.of();

    const {
      zoom,
      tileList
    } = this.props;

    if (!zoom) {
      return <div className="wall-wrapper" ref="root">
        <div className="wall"></div>
      </div>
    }

    const size = {
      w: originalSize.get('w') * zoom,
      h: originalSize.get('h') * zoom,
    }
    const style = {
      width: size.w,
      height: size.h,
    }

    return <div className="wall-wrapper" ref="root">
      <div className="wall" style={style}>
        {bars.map((bar, i) => 
          <Bar key={`bar-${i}`}
              bar={bar}
              zoom={zoom} />
        )}
        {tiles.map((tile, i) => 
          <TileOnWall key={`tile-${i}`}
              item={tile}
              zoom={zoom}
              tileList={tileList}
          />
        )}
      </div>
    </div>

  }
}

Wall.propTypes = {
  wall: PropTypes.instanceOf(Map),
  zoom: PropTypes.number,
  tileList: PropTypes.instanceOf(List)
}