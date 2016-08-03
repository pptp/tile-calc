require('../../../styles/wall-tiler.less')

import { List, Map } from 'immutable'

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import Wall from '../../common/Wall'

import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class WallTiler extends Component {
  updateZoom(props = null) {
    const $wallContainer = $(ReactDOM.findDOMNode(this.refs.wallContainer))

    /*
    const wallList = (props || this.props).editWall

    const zoom = wallList.count() ? wallList.reduce((zoom, wall) => {
      const size = wall.get('size').toJS()
      const currentZoom = Math.min($wall.width() / size.w, $wall.height() / size.h)
      return zoom ? Math.min(zoom, currentZoom) : currentZoom
    }, false) : 1;
    */

    const wall = (props || this.props).wall
    const size = wall.get('size').toJS()
    const zoom = Math.min(
      $wallContainer.width() / size.w, 
      $wallContainer.height() / size.h
    )
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
    // console.log("New Props", nextProps)
    this.updateZoom(nextProps)
  }


  setSliderPosition(event, pos) {
    pos = Math.max(pos, this.state.slider.start)

    const tile = this.props.tile.toJS()
    const count = Math.floor((pos - this.state.slider.start) / tile.size.h)

    this.setState({
      slider: Object.assign(this.state.slider, {
        pos: pos,
        count: count
      })
    })
  }

  handleAddTileToWall() {
    const action = this.props.actions.addTileToWall;
    action({
      wallIndex: null, // just editable wall
      // wallIndex: this.props.wallIndex,
      tileId: this.props.tile.get('id'),
      count: this.state.slider.count
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      zoom: 1,
      screen: {
        width: $(window).width(),
        height: $(window).height()
      },
      slider: {
        start: 0,
        pos: 0,
        count: 0
      }
    }

    this.setSliderPosition = this.setSliderPosition.bind(this)
    this.handleAddTileToWall = this.handleAddTileToWall.bind(this)
  }

  render() {
    const { wall, tile } = this.props
    const { zoom, slider } = this.state

    const count = this.state.slider.count

    const wallSize = wall.get('size').toJS()
    const tileSize = tile ? tile.get('size').toJS() : {w: 0, h: 0}

    const sliderCss = {
      paddingBottom: 24,
      marginTop: -24,
      display: tile ? '' : 'none'
    }

    const applyDisabled = !count
    // console.log("Slided count:", this.state.slider.count);
    // console.log("Wall:", wall.toJS()  );

    return <div className="wall-tiler">
      <div className="wall-tiler-container">

        <Slider axis="y"
            style={sliderCss}
            min={slider.start}
            max={wallSize.h}
            step={tileSize.h}
            onChange={this.setSliderPosition}
            defaultValue={slider.start} />

        <div className="wall-container"
            ref="wallContainer">
          <Wall wall={wall} zoom={zoom} />
        </div>

        <FlatButton label="Apply" 
            disabled={applyDisabled}
            onClick={this.handleAddTileToWall}
            primary={true} />
      </div>

      <div className="controls-container">
        <div className="controls">
          <RaisedButton label="Save" 
              primary={true} />
        </div>
      </div>
    </div>
  }
}

WallTiler.propTypes = {
  wall: PropTypes.instanceOf(Map),
  tile: PropTypes.instanceOf(Map),
  edit: PropTypes.number,
  tileList: PropTypes.instanceOf(List),
  actions: PropTypes.object,
  wallIndex: PropTypes.number
}