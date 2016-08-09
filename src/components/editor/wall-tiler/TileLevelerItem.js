import { List, Map } from 'immutable'

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import FontIcon from 'material-ui/FontIcon';


export default class TileLevelerItem extends Component {
  handleRemoveMe() {
    const action = this.props.actions.removeTileFromWall
    action({
      tileList: this.props.tileList,
      tileIndex: this.props.tileIndex,
    })
  }

  render() {
    const {
      tile,
      height,
      count
    } = this.props

    const style = {
      height: height 
    }

    return <div className="tile-leveler-item" style={style}>
      <div className="name" onClick={this.handleRemoveMe.bind(this)}>
        {tile.name}&nbsp;x&nbsp;{count}
      </div>
    </div>
  }
}

TileLevelerItem.propTypes = {
  height: PropTypes.number,
  count: PropTypes.number,
  tile: PropTypes.object,
  actions: PropTypes.object,
  tileIndex: PropTypes.number,
  wallIndex: PropTypes.number,
  tileList: PropTypes.instanceOf(List),
  wall: PropTypes.instanceOf(Map),
}