require('../../styles/wall-edit.less');

import React, { PropTypes, Component } from 'react'

import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import TabEditWall from './TabEditWall'


export default class Editor extends Component {
  doCancelEdit() {
    this.props.actions.setToEditWall(null);
  }
  doRemoveWall() {
    this.props.actions.removeWall(this.props.index);
    this.doCancelEdit();
  }

  render() {
    // const bars = this.props.wall.get('bar') || List.of();
    const bars = [];
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
          <div className="edit-general">
            <Paper>
              <TabEditWall
                  wallIndex={this.props.wall}
                  action={this.props.actions.editWall} />
            </Paper>
          </div>
        </Tab>
        <Tab label="Bars">
        </Tab>
      </Tabs>
    </div>;
  }
          // <WallEditBars bars={bars} wallIndex={index} actions={actions} />
              // <WallEditGeneral action={::this.doGeneralEdit} wall={this.props.wall} />
}

Editor.propTypes = {
  wall: PropTypes.number,
  // wall: PropTypes.instanceOf(Map),
  index: PropTypes.number,
}