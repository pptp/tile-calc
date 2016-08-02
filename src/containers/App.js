// require('normalize.css/normalize.css');
require('../styles/App.css');

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';

import * as wallActions from '../actions/WallActions'
import * as tileActions from '../actions/TileActions'

import Main from '../components/Main'

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
    const { actions, walls, tiles } = this.props;

    const tileList = tiles.get('list')
    const currentTile = tiles.get('edit')

    const wallList = walls.get('list')
    const currentWall = walls.get('edit')

    // console.log( tileList.toJS() );

    return <MuiThemeProvider muiTheme={muiTheme}>
      <Main 
        tileList={tileList}
        wallList={wallList}
        currentWall={currentWall}
        currentTile={currentTile}
        actions={actions}
      />
    </MuiThemeProvider>
  }
}


App.propTypes = {
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    walls: state.walls,
    tiles: state.tiles
  };
}
function mapDispatchToProps(dispatch) {
  const actions = { ...wallActions, ...tileActions };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
