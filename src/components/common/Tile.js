require('../../styles/tile.less');

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import { Map, List } from 'immutable'

export default class Tile extends Component {

  render() {
    const tile = this.props.tile;

    const originalSize = tile.get('size').toJS();
    const name = tile.get('name')
    const zoom = this.props.zoom;

    const size = {
      w: originalSize.w * zoom,
      h: originalSize.h * zoom,
    }

    const style = {
      width: size.w,
      height: size.h,
    }

    return <div className="tile-wrapper" ref="root">
      <div className="tile" style={style}>
      </div>
      <span className="label name">{name}</span>
      <span className="label definition">{originalSize.w}x{originalSize.h}</span>
    </div>

  }
}

Tile.propTypes = {
  tile: PropTypes.instanceOf(Map),
  zoom: PropTypes.number
}