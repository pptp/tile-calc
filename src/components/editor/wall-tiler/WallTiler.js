require('../../../styles/edit-form.less')

import { List, Map } from 'immutable'

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import Wall from '../../common/Wall'
import TileLeveler from './TileLeveler'

import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class WallTiler extends Component {
  updateZoom(props = null) {
    const $wallContainer = $(ReactDOM.findDOMNode(this.refs.wallContainer))

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

  updateSliderPos(props) {
    const iTileMap = (props || this.props).wall.get('tileMap') || List.of()
    const tileMap = iTileMap.toJS()

    const start = tileMap.reduce((sum, tileItem) => 
      sum + this.getTileById(tileItem.tileId).size.h * tileItem.count 
    , 0)

    // console.log("start:", start)

    this.setState({
      slider: Object.assign(this.state.slider, {
        start: start
      })
    })
  }

  getTileById(id) {
    const tileList = this.props.tileList.toJS()
    return tileList.find(tile => tile.id == id)
  }

  componentWillMount() {
    // this.updateDimensions.call(this);
    // this.updateSliderPos.call(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this))
    this.updateZoom()
    this.updateSliderPos.call(this);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }
  componentWillReceiveProps(nextProps) {
    // console.log("New Props", nextProps)
    this.updateZoom(nextProps)
    this.updateSliderPos(nextProps)
  }


  setSliderPosition(event, pos) {
    // console.log("Slider Pos", pos)
    // pos = Math.max(pos, this.state.slider.start)

    const tile = this.props.tile.toJS()
    const count = Math.ceil(pos / tile.size.h)
    // const count = Math.floor((pos - this.state.slider.start) / tile.size.h)

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
      // wallIndex: this.props.wallIndex,
      tileId: this.props.tile.get('id'),
      count: this.state.slider.count,
      tileList: this.props.tileList,
    })
    // debugger;
    this.setState({
      slider: Object.assign(this.state.slider, {
        pos: 0,
        count: 0
      })
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
      },
    }
    
    this.setSliderPosition = this.setSliderPosition.bind(this)
    this.handleAddTileToWall = this.handleAddTileToWall.bind(this)
    this.doSaveWall = this.doSaveWall.bind(this)
  }

  doSaveWall() {
    this.props.actions.saveWall({})
  }

  render() {
    const {
      wall,
      tile,
      tileList,
      wallIndex,
      actions
    } = this.props
    const {
      zoom,
      slider,
    } = this.state

    const count = this.state.slider.count

    const wallSize = wall.get('size').toJS()
    const tileSize = tile ? tile.get('size').toJS() : {w: 0, h: 0}

    let sliderShow = true;
    if (!tile) {
      sliderShow = false
    }
    const freeSlideSpace = wallSize.h - slider.start
    // if (freeSlideSpace < tileSize.h) { // :()
    if (freeSlideSpace < 0) {
      sliderShow = false
    }
    // style={editorStyle}
    const wallHeight = wallSize.h * zoom;

    const sliderCss = {
      // paddingBottom: 24 + slider.start * zoom,
      // marginTop: -24,
      paddingBottom: slider.start * zoom,
      marginTop: -48,
      display: sliderShow ? '' : 'none',
      height: wallHeight
    }

    const applyDisabled = !count

    
    // console.log("slider:", slider)
            // max={Math.max(0, wallSize.h - slider.start) }

    return <div className="wall-tiler form-editor">
      <div className="form-editor-container" style={{alignItems:'center'}}>

        <Slider axis="y"
            style={sliderCss}
            min={0}
            max={Math.max(tileSize.h, wallSize.h - slider.start)  }
            step={tileSize.h}
            onChange={this.setSliderPosition}
            value={slider.pos}
            defaultValue={0} />

        <div className="wall-container"
            ref="wallContainer">
          <Wall
              wall={wall}
              zoom={zoom}
              tileList={tileList} />
        </div>

        <TileLeveler actions={actions}
            wall={wall}
            zoom={zoom}
            tileList={tileList}
            wallIndex={wallIndex}
            height={wallHeight}
        />

        <FlatButton label="Apply" 
            disabled={applyDisabled}
            onClick={this.handleAddTileToWall}
            primary={true} />
      </div>

      <div className="controls-container">
        <div className="controls">
          <RaisedButton label="Save"
              onClick={this.doSaveWall}
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