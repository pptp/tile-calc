require('../styles/components/slider.less');

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { List } from 'immutable'
import Slider from 'react-motion-slider'
import Wall from './Wall'
import WallAdd from './WallAdd'

import RaisedButton from 'material-ui/RaisedButton';
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


export default class WallList extends Component {
  doSetToEditWall(key) {
    this.props.actions.setToEditWall(key);
  }

  componentDidMount() {
    const wall = ReactDOM.findDOMNode(this.refs.wallWrapAdd);

    if (!this.state.zoom) {
      let zoom;
      
      const wallStyle = window.getComputedStyle(wall, null);

      const wallWidth = wall.clientWidth -
        parseFloat(wallStyle.getPropertyValue('padding-left')) -
        parseFloat(wallStyle.getPropertyValue('padding-right'));

      const wallHeight = wall.clientHeight -
        parseFloat(wallStyle.getPropertyValue('padding-top')) -
        parseFloat(wallStyle.getPropertyValue('padding-bottom'));

      const { wallList } = this.props;

      zoom = wallList.reduce((zoom, wall) => {
        const size = wall.get('size');
        const currentZoom = Math.min(wallWidth / size.get('w'), wallHeight / size.get('h'));
        return zoom ? Math.min(zoom, currentZoom) : currentZoom;
      }, zoom);

      this.setState({ zoom: zoom });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      zoom: null,
      adding: false
    }
  }

  render() {
    const { wallList, currentWall, actions } = this.props;

    console.log(wallList.toJS());

    const lastWall = wallList.last();
    const suggestWidth = lastWall ? lastWall.get('size').get('w') : 0
    const suggestHeight = lastWall ? lastWall.get('size').get('h') : 0

    return <div className="">
      <Slider ref="slider" autoHeight={true} slidesToShow={3}>
        { wallList.map((wall, i) => {
          const className = (i == currentWall) ? 'active' : '';
          return <li key={`slide-${i}`}
              className={"slide " + className}
              ref="wallWrap"
              onClick={this.doSetToEditWall.bind(this, i)} >
            <Wall wall={wall} zoom={this.state.zoom}  />
          </li>
        })}
        <li className="slide slide-add" ref="wallWrapAdd">
          <WallAdd action={actions.addWall} width={suggestWidth} height={suggestHeight} />
        </li>

      </Slider>
    </div>
  }
      // <Toolbar>
      //   <ToolbarGroup firstChild={false}>
      //     <ToolbarTitle text="Walls" />
      //     <RaisedButton label="Add" primary={true} onClick={::this.onAddWall} />
      //   </ToolbarGroup>
      // </Toolbar>
}

WallList.propTypes = {
  wallList: PropTypes.instanceOf(List),
  currentWall: PropTypes.number
}