require('../styles/wall-edit.less');

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { Map, List } from 'immutable';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

import WallEditGeneral from './WallEditGeneral'
import WallEditBars from './WallEditBars'

export default class WallEdit extends Component {
  doCancelEdit() {
    this.props.actions.setToEditWall(null);
  }
  doRemoveWall() {
    this.props.actions.removeWall(this.props.index);
    this.doCancelEdit();
  }

  doGeneralEdit(wall) {
    this.props.actions.editWall({
      index: this.props.index,
      wall: wall
    });
    // console.log("General Edit: ", wall, wall.get('size').get('w'));
  }

  doBarsAdd() {

  }

  render() {
    const bars = this.props.wall.get('bar') || List.of();
    const {index, actions} = this.props;

    return <div className="wall-edit">
      <Toolbar>
        <ToolbarGroup >
          <ToolbarTitle text="Edit Wall" />
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton secondary={true} label="Remove" onClick={::this.doRemoveWall} />
          <FlatButton  label="Cancel" onClick={::this.doCancelEdit} />
        </ToolbarGroup>
      </Toolbar>

      <Tabs>
        <Tab label="General">
          <WallEditGeneral action={::this.doGeneralEdit} wall={this.props.wall} />
        </Tab>
        <Tab label="Bars">
          <WallEditBars bars={bars} wallIndex={index} actions={actions} />
        </Tab>
      </Tabs>
    </div>;
  }
}

WallEdit.propTypes = {
  wall: PropTypes.instanceOf(Map),
  index: PropTypes.number,
}