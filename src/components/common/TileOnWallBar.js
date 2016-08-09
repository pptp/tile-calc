import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import { Map, List } from 'immutable'

export default class TileOnWallBar extends Component {

  render() {
    const {
      zoom,
      bar,
    } = this.props;
    
    const style = {
      left:   bar.get('x') * zoom,
      top:    bar.get('y') * zoom,
      width:  bar.get('w') * zoom,
      height: bar.get('h') * zoom
    }

    return <div className="tile-bar" style={style}></div>
  }
}

TileOnWallBar.propTypes = {
  bar: PropTypes.instanceOf(Map),
  zoom: PropTypes.number,
}