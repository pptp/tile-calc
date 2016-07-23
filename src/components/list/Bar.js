import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

export default class Bar extends Component {

  render() {
    const zoom = this.props.zoom;

    const style = {
      left:   this.props.bar.x * zoom,
      top:    this.props.bar.y * zoom,
      width:  this.props.bar.w * zoom,
      height: this.props.bar.h * zoom
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
  bar: PropTypes.object,
  zoom: PropTypes.number
}