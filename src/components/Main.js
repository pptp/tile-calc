import React, { Component, PropTypes } from 'react'

import WallList from "../components/list/WallList"
import Editor from "../components/editor/Editor"

import Paper from 'material-ui/Paper';

export default class Main extends Component {
  render() {
    const { wallList, currentWall, actions } = this.props;

    const editStatement = (currentWall !== null) ?
      <Editor 
          wall={currentWall}
          index={currentWall}
          actions={actions} /> :
      '';

    // return <div className="wallListApp Main">
    return <div className="index">
      <Paper>
        <WallList
            actions={actions}
            wallList={wallList}
            currentWall={currentWall}>
        </WallList>
      </Paper>

      {editStatement}
    </div>
  }
}

Main.propTypes = {
  wallList:    PropTypes.array.required,
  currentWall: PropTypes.object.required,
  actions:     PropTypes.array.required,
}