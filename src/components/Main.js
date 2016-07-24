import React, { Component, PropTypes } from 'react'

import { List } from 'immutable'

import WallList from "../components/list/WallList"
import Editor from "../components/editor/Editor"

import Paper from 'material-ui/Paper';

export default class Main extends Component {
  render() {
    const {
      wallList,
      currentWall,
      actions
    } = this.props;

    console.log("currentWall:", currentWall);

    let editStatement;
    if (currentWall !== null) {
      const editableWall = wallList.get(currentWall);
      editStatement = <Editor
          wallIndex={currentWall}
          wall={editableWall}
          actions={actions} />
      
      // editStatement = '';
    } else {
      editStatement = '';
    }

    return <div className="index">
      <Paper>
        <WallList
            actions={actions}
            wallList={wallList}
            currentWall={currentWall}
        />
      </Paper>

      {editStatement}
    </div>
  }
}

Main.propTypes = {
  wallList:    PropTypes.instanceOf(List),
  currentWall: PropTypes.number,
  actions:     PropTypes.object,
}