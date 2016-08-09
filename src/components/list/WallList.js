require('../../styles/components/slider.less');
require('../../styles/components/slider-wall.less');

import { List } from 'immutable'

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import Slider from 'react-motion-slider'
import Wall from '../common/Wall'
import WallAdd from './WallAdd'

import RaisedButton from 'material-ui/RaisedButton';


export default class WallList extends Component {
  doSetToEditWall(key) {
    this.props.actions.setToEditWall({
      wallIndex: key
    });
  }

  updateZoom(props = null) {
    const $wall = $(ReactDOM.findDOMNode(this.refs.wallWrapAdd))

    const wallList = (props || this.props).wallList

    const zoom = wallList.count() ? wallList.reduce((zoom, wall) => {
      const size = wall.get('size').toJS()
      const currentZoom = Math.min($wall.width() / size.w, $wall.height() / size.h)
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
      adding: false,
      screen: {
        width: $(window).width(),
        height: $(window).height()
      }
    }

  }

  render() {
    const {
      wallList,
      currentWallIndex,
      actions,
      tileList
    } = this.props
    const { zoom } = this.state

    // const lastWall = wallList[wallList.length - 1];
    let suggestWidth = 0;
    let suggestHeight = 0;

    if (wallList.count()) {
      const lastWall = wallList.last();
      suggestWidth = parseInt(lastWall.get("size").get("w"))
      suggestHeight = parseInt(lastWall.get("size").get("h"))
    }

    // console.log('Wall List count:', wallList.count());
    
    const slidesToShow = Math.max(1, Math.floor(this.state.screen.width / 200));

    return <div>
      <Slider
          ref="slider"
          autoHeight={true}
          slidesToShow={slidesToShow}>

        { wallList.map((wall, i) => {
          const className = (i == currentWallIndex) ? 'active' : ''
          return <li key={`slide-${i}`}
              className={"slide wall-slide " + className}
              onClick={this.doSetToEditWall.bind(this, i)}>
            <Wall 
                wall={wall}
                zoom={zoom}
                tileList={tileList}
            />
          </li>
        })}
        <li className="slide wall-slide slide-add" ref="wallWrapAdd">
          <WallAdd
              action={actions.addWall}
              width={suggestWidth}
              height={suggestHeight}
          />
        </li>
      </Slider>
    </div>
  }
}

WallList.propTypes = {
  wallList: PropTypes.instanceOf(List),
  currentWallIndex: PropTypes.number,
  actions: PropTypes.object,
  tileList: PropTypes.instanceOf(List),
}