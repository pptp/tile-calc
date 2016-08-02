import React, { PropTypes, Component } from 'react'

import { List as immutableList, Map } from 'immutable'

import ReactDOM from 'react-dom'
import { reset } from 'redux-form'
import { connect } from 'react-redux'

import { List , ListItem} from 'material-ui/List';

import Slider from 'react-motion-slider'
import TabEditTilesList from './TabEditTilesList'

export default class TabEditTiles extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      tileList,
      currentTile,
      actions
    } = this.props
      // <div key={'tile-' + i}>{tile.get('id')}</div>
      // <List>
      //   {tileList.map((tile, i) => 
      //     <ListItem key={'tile-' + i}>
      //       {tile}
      //     </ListItem>
      //   )}
      // </List>

    return <div>
      <TabEditTilesList 
        tileList={tileList}
        action={actions.setToEditTile}
        currentTile={currentTile}
      />
    </div>
  }
}

TabEditTiles.propTypes = {
  tileList: PropTypes.instanceOf(immutableList),
  actions: PropTypes.object,
  currentTile: PropTypes.number,
  wall: PropTypes.instanceOf(Map),
  wallIndex: PropTypes.number,
};

export default connect(undefined, {reset}) (TabEditTiles)