import React, { Component, PropTypes } from 'react'

import { List, Map } from 'immutable'

import WallList from "../components/list/WallList"
import Editor from "../components/editor/Editor"

import Paper from 'material-ui/Paper';

export default class Main extends Component {
  render() {
    const {
      wallList,
      currentWallIndex,
      currentTileIndex,
      currentWall,
      currentTile,
      actions,
      tileList
    } = this.props;

    let editStatement;
    if (currentWallIndex !== null) {
      const editableWall = wallList.get(currentWallIndex);
      editStatement = <Editor
        tileList={tileList}
        wallIndex={currentWallIndex}
        wall={currentWall}
        tile={currentTile}
        currentTileIndex={currentTileIndex}
        actions={actions} />
        // wall={editableWall}

      // editStatement = '';
    } else {
      editStatement = '';
    }

    return <div className="index">
      <Paper>
        <WallList
            actions={actions}
            wallList={wallList}
            currentWallIndex={currentWallIndex}
        />
      </Paper>

      {editStatement}
    </div>
  }
}

Main.propTypes = {
  wallList:    PropTypes.instanceOf(List),
  tileList:    PropTypes.instanceOf(List),
  currentWall: PropTypes.instanceOf(Map),
  currentWallIndex: PropTypes.number,
  currentTile: PropTypes.instanceOf(Map),
  currentTileIndex: PropTypes.number,
  actions:     PropTypes.object,
}