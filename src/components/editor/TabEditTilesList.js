require('../../styles/components/slider.less');
require('../../styles/components/slider-tile.less');

import { List } from 'immutable'

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import Slider from 'react-motion-slider'
// import Wall from './Wall'
// import WallAdd from './WallAdd'

import RaisedButton from 'material-ui/RaisedButton';

import Tile from './Tile'

export default class TabEditTilesList extends Component {
  doSetToEditTile(key) {
    this.props.action({
      tileIndex: key
    });
  }

  updateZoom(props = null) {
    const $tile = $(ReactDOM.findDOMNode(this.refs.tile))

    const tileList = (props || this.props).tileList

    const zoom = tileList.count() ? tileList.reduce((zoom, tile) => {
      const size = tile.get('size').toJS()
      const currentZoom = Math.min($tile.width() / size.w, $tile.height() / size.h)
      return zoom ? Math.min(zoom, currentZoom) : currentZoom
    }, false) : 1;

    this.setState({ zoom: zoom })
  }

  updateDimensions() {
    this.setState({
      screen: {
        width: $(window).width(),
        height: $(window).height()
      }
    })
    this.updateZoom()
  }
  componentWillMount() {
    this.updateDimensions.call(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this))
    this.updateZoom()
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }
  componentWillReceiveProps(nextProps) {
    this.updateZoom(nextProps)
  }

  constructor(props) {
    super(props);
    this.state = {
      zoom: 1,
      screen: {
        width: $(window).width(),
        height: $(window).height()
      }
    }
    // this.doSetToEditTile = this.doSetToEditTile.bind(this)
  }

  render() {
    const { tileList, currentTile } = this.props
    const { zoom } = this.state

    const slidesToShow = Math.max(1, Math.floor(this.state.screen.width / 100));

    return <div>
      <Slider
          ref="slider"
          autoHeight={false}
          slidesToShow={slidesToShow}>

        { tileList.map((tile, i) => {
          const className = (i == currentTile) ? 'active' : ''
          return <li key={`slide-${i}`}
              ref="tile"
              onClick={this.doSetToEditTile.bind(this, i)}
              className={"slide tile-slide " + className}>

            <Tile tile={tile} zoom={zoom} />
          </li>
        })}

      </Slider>
    </div>
  }
}
              // onClick={this.doSetToEditWall.bind(this, i)}>

TabEditTilesList.propTypes = {
  tileList: PropTypes.instanceOf(List),
  currentTile: PropTypes.number,
  action: PropTypes.func,
}