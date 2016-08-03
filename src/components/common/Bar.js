import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import { Map } from 'immutable'

export default class Bar extends Component {

  render() {
    const zoom = this.props.zoom;

    const style = {
      left:   this.props.bar.get('x') * zoom,
      top:    this.props.bar.get('y') * zoom,
      width:  this.props.bar.get('w') * zoom,
      height: this.props.bar.get('h') * zoom
    }


    /*
    const originalSize = this.props.wall.get('size');

    const size = {
      x: originalSize.get('x') * zoom,
      y: originalSize.get('y') * zoom,
    };

    const style = {
      width: size.x,
      height: size.y,
    }
    */

    return <div className="bar" style={style}></div>
  }
}

Bar.propTypes = {
  bar: PropTypes.instanceOf(Map),
  zoom: PropTypes.number
}