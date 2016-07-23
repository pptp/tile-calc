require('../../styles/wall.less');

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import Bar from './Bar'
import { Map, List } from 'immutable'

export default class Wall extends Component {

  render() {
    const originalSize = this.props.wall['size'];
    const bars = this.props.wall['bar'] || [];

    const zoom = this.props.zoom;

    const size = {
      w: originalSize['w'] * zoom,
      h: originalSize['h'] * zoom,
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
  wall: PropTypes.object,
  zoom: PropTypes.number
}