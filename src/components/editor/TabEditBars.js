import React, { PropTypes, Component } from 'react'

import { List } from 'immutable'

import ReactDOM from 'react-dom'
import { reset } from 'redux-form'
import { connect } from 'react-redux'

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import FormBar from './forms/FormBar'

export default class TabEditWall extends Component {

  constructor(props) {
    super(props)
    this.state = {
      select: null
    }

    this.doEdit = this.doEdit.bind(this)
    this.doDelete = this.doDelete.bind(this)
  }

  doSelect(index) {
    this.setState({select: index});
  }
  doCreate() {
    this.props.actions.addBar({
      wallIndex: this.props.wallIndex
    });
  }

  doDelete() {
    this.props.actions.removeBar({
      barIndex: this.state.select,
      wallIndex: this.props.wallIndex,
    })
    this.setState({select: null});
  }
  doEdit(data) {
    this.props.actions.editBar({
      barIndex: this.state.select,
      wallIndex: this.props.wallIndex,
      bar: data
    });
  }

  render() {
    const {bars, wallIndex, actions} = this.props;
    const {select} = this.state;

    const form = (select === null || !bars.get(select)) ? '' :
        <FormBar 
            onSubmit={this.doEdit}
            onDelete={this.doDelete}
            wallIndex={wallIndex}
            barIndex={select}
        />;

    return <div className="edit-bars">
      <Paper>
        <div className="edit-bars-content">

          <h2>Bars</h2>
          <div className="edit-bars-form">
            <div className="edit-bars-list">
              <Menu>
                { bars.map((bar, i) => 
                  <MenuItem key={`edit-bar-${i}`}
                      primaryText={bar.get('name')}
                      onClick={this.doSelect.bind(this, i)} />
                )}
              </Menu>
              <br />
              <RaisedButton label="Create"
                  primary={true}
                  onClick={::this.doCreate}/>
            </div>
            <div className="edit-bars-controls">
              {form}
            </div>
          </div>

        </div>
      </Paper>
    </div>
  }
}

TabEditWall.propTypes = {
  bars:       PropTypes.instanceOf(List),
  wallIndex:  PropTypes.number,
  actions:    PropTypes.object
}

export default connect(undefined, {reset}) (TabEditWall)