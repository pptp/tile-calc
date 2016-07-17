// require('normalize.css/normalize.css');
require('../styles/App.css');

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';

import WallList from "../components/WallList"
import WallEdit from "../components/WallEdit"

import * as wallActions from '../actions/WallActions'
import Paper from 'material-ui/Paper';

// https://github.com/callemall/material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  // userAgent: req.headers['user-agent'],
});


class App extends Component {
  render() {
    const { actions, walls } = this.props;

    const wallList = walls.get('list');

    const currentWall = walls.get('edit')
    const editStatement = (currentWall !== null) ?
      <WallEdit
          wall={wallList.get(currentWall)}
          index={currentWall}
          actions={actions} /> :
      '';

    return <MuiThemeProvider muiTheme={muiTheme}>
      <div className="wallListApp">
        <Paper>
          <WallList
              actions={actions}
              wallList={wallList}
              currentWall={currentWall}>
          </WallList>
        </Paper>

        {editStatement}
      </div>
    </MuiThemeProvider>
  }
}


App.propTypes = {
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    walls: state.walls
  };
}
function mapDispatchToProps(dispatch) {
  const actions = { ...wallActions };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
