require('../styles/wall.less');

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import Bar from './Bar'
import { Map, List } from 'immutable'

export default class Wall extends Component {

  render() {
    const originalSize = this.props.wall.get('size');
    const bars = this.props.wall.get('bar') || List.of();

    const zoom = this.props.zoom;

    const size = {
      w: originalSize.get('w') * zoom,
      h: originalSize.get('h') * zoom,
    };

    const style = {
      width: size.w,
      height: size.h,
    }

    return <div className="wall-wrapper" ref="root">
      <div className="wall" style={style}>
        { bars.map((bar, i) => 
          <Bar key={`bar-${i}`} bar={bar} zoom={zoom} />
        )}
      </div>
    </div>
  }
}

Wall.propTypes = {
  wall: PropTypes.instanceOf(Map),
  zoom: PropTypes.number
}