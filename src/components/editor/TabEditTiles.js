import React, { PropTypes, Component } from 'react'

import { List as immutableList, Map } from 'immutable'

import ReactDOM from 'react-dom'
import { reset } from 'redux-form'
import { connect } from 'react-redux'

import { List , ListItem} from 'material-ui/List';

import Slider from 'react-motion-slider'
import TilesList from './wall-tiler/TilesList'
import WallTiler from './wall-tiler/WallTiler'

export default class TabEditTiles extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      tileList,
      currentTileIndex,
      actions,
      wall,
      tile,
      wallIndex
    } = this.props

    return <div>
      <TilesList 
        tileList={tileList}
        action={actions.setToEditTile}
        currentTileIndex={currentTileIndex}
      />
      <WallTiler 
        wall={wall}
        tile={tile}
        tileList={tileList}
        wallIndex={wallIndex}
        actions={actions}
        currentTileIndex={currentTileIndex}
      />
    </div>
  }
}

TabEditTiles.propTypes = {
  tileList: PropTypes.instanceOf(immutableList),
  actions: PropTypes.object,
  currentTileIndex: PropTypes.number,
  wall: PropTypes.instanceOf(Map),
  tile: PropTypes.instanceOf(Map),
  wallIndex: PropTypes.number,
};

export default connect(undefined, {reset}) (TabEditTiles)