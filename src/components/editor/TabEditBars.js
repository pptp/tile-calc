require('../../styles/wall-edit.less')
require('../../styles/tab-bars.less')

import React, { PropTypes, Component } from 'react'

import { List, Map } from 'immutable'

import ReactDOM from 'react-dom'
import { reset } from 'redux-form'
import { connect } from 'react-redux'

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import Wall from '../common/Wall'


import FormBar from './forms/FormBar'

export default class TabEditWall extends Component {

  updateZoom(props = null) {
    const $wallContainer = $(ReactDOM.findDOMNode(this.refs.wallContainer))

    const wall = (props || this.props).wall
    const size = wall.get('size').toJS()
    const zoom = Math.min(
      $wallContainer.width() / size.w, 
      $wallContainer.height() / size.h
    )

    if (zoom) {
      this.setState({ zoom: zoom })
    }
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
    // this.updateDimensions.call(this);
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
    super(props)
    this.state = {
      select: null,
      screen: {
        width: $(window).width(),
        height: $(window).height()
      },
    }

    this.doEdit = this.doEdit.bind(this)
    this.doDelete = this.doDelete.bind(this)
    this.doReset = this.doReset.bind(this)
    this.doSaveWall = this.doSaveWall.bind(this)
  }

  doSaveWall() {
    this.props.actions.saveWall({})
  }

  doSelect(index) {
    this.setState({select: index});
  }
  doCreate() {
    this.props.actions.addBar({
      wallIndex: this.props.wallIndex,
      tileList: this.props.tileList
    });
  }

  doDelete() {
    this.props.actions.removeBar({
      barIndex: this.state.select,
      // wallIndex: this.props.wallIndex,
      tileList: this.props.tileList,
    })
    this.setState({select: null});
  }
  doReset() {
    this.setState({select: null});
  }
  doEdit(data) {
    this.props.actions.editBar({
      tileList: this.props.tileList,
      barIndex: this.state.select,
      wallIndex: this.props.wallIndex,
      bar: data
    });
    this.setState({select: null});
  }

  render() {
    const {
      bars,
      wallIndex,
      actions,
      wall,
      tileList
    } = this.props;

    const {select, zoom} = this.state;

    // console.log("Zoom:", zoom);

    const ctrl = (select === null || !bars.get(select)) ? 
        <div className="wall-container"
            ref="wallContainer">
          <Wall wall={wall} zoom={zoom} tileList={tileList}  /> 
        </div>
        :
        <FormBar 
            onSubmit={this.doEdit}
            onDelete={this.doDelete}
            onReset={this.doReset}
            wallIndex={wallIndex}
            barIndex={select}
        />;

    return <div className="edit-bars">
      <Paper>
        <div className="edit-bars-content">

          <h2>Bars</h2>
          <div className="edit-bars-form form-editor">
            <div className="form-editor-container">

              <div className="edit-bars-list">
                <Menu>
                  { bars.map((bar, i) => 
                    <MenuItem key={`edit-bar-${i}`}
                        primaryText={bar.get('name')}
                        onClick={this.doSelect.bind(this, i)} />
                  )}
                </Menu>
                <br />
                <RaisedButton label="Create"
                    primary={true}
                    onClick={::this.doCreate}/>
              </div>
              <div className="edit-bars-controls">
                {ctrl}
              </div>
            </div>

            <div className="controls-container">
              <div className="controls">
                <RaisedButton label="Save"
                    onClick={this.doSaveWall}
                    primary={true} />
              </div>
            </div>
          </div>

        </div>
      </Paper>
    </div>
  }
}

TabEditWall.propTypes = {
  bars:       PropTypes.instanceOf(List),
  tileList:   PropTypes.instanceOf(List),
  wallIndex:  PropTypes.number,
  actions:    PropTypes.object,
  wall:       PropTypes.instanceOf(Map)
}

export default connect(undefined, {reset}) (TabEditWall)