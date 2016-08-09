require('../../styles/wall-edit.less');

import React, { PropTypes, Component } from 'react'

import { Map, List } from 'immutable'

import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import TabEditWall from './TabEditWall'
import TabEditBars from './TabEditBars'
import TabEditTiles from './TabEditTiles'


export default class Editor extends Component {
  doCancelEdit() {
    this.props.actions.cancelEditWall();
  }
  doRemoveWall() {
    this.props.actions.removeWall({
      wallIndex: this.props.wallIndex
    });
    this.doCancelEdit();
  }

  render() {
    const {
      wallIndex,
      actions,
      tileList,
      currentTileIndex,
      wall,
      tile
    } = this.props;
    const bars = wall.get('bar');

    return <div className="wall-edit">
      <Toolbar>
        <ToolbarGroup >
          <ToolbarTitle text="Edit Wall" />
        </ToolbarGroup>

        <ToolbarGroup>
          <FlatButton
              secondary={true}
              label="Remove"
              onClick={::this.doRemoveWall}
          />
          <FlatButton
              label="Cancel"
              onClick={::this.doCancelEdit}
          />
        </ToolbarGroup>
      </Toolbar>
      
      <Tabs>
        <Tab label="General">
          <div className="edit-general">
            <Paper>
              <TabEditWall
                  tileList={tileList}
                  wallIndex={wallIndex}
                  actions={this.props.actions}
              />
            </Paper>
          </div>
        </Tab>
        
        <Tab label="Bars">
          <div className="edit-bars">
            <Paper>
              <TabEditBars
                  bars={bars}
                  wallIndex={wallIndex}
                  wall={wall}
                  actions={this.props.actions}
                  tileList={tileList}
              />
            </Paper>
          </div>
        </Tab>


        <Tab label="Tiles">
          <div className="edit-tiles">
            <Paper>
              <TabEditTiles 
                  wall={wall}
                  tile={tile}
                  wallIndex={wallIndex}
                  tileList={tileList}
                  currentTileIndex={currentTileIndex}
                  actions={this.props.actions}
              />
            </Paper>
          </div>
        </Tab>

      </Tabs>

    </div>;
  }
}

Editor.propTypes = {
  wallIndex: PropTypes.number,
  currentTileIndex: PropTypes.number,
  wall: PropTypes.instanceOf(Map),
  tile: PropTypes.instanceOf(Map),
  actions: PropTypes.object,
  tileList: PropTypes.instanceOf(List),
}