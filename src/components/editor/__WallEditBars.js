import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { List } from 'immutable';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
// import IconButton from 'material-ui/IconButton';

import EditBarForm from './EditBarForm';

export default class WallEditBars extends Component {
  doSelect(index) {
    this.setState({
      select: index,
    });
  }
  doCreate() {
    this.props.actions.addBar(this.props.wallIndex);
  }

  constructor(props) {
    super(props);
    this.state = {
      select: null,
      // bars: props.bars
    }
  }

  render() {
    const {bars, wallIndex, actions} = this.props;
    const {select} = this.state;

    const form = (select === null || !bars.get(select)) ? '' :
        <EditBarForm data={bars.get(select)}
            actions={actions}
            wallIndex={wallIndex}
            barIndex={select} />

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
    </div>;
  }
}

WallEditBars.propTypes = {
  bars: PropTypes.instanceOf(List),
  wallIndex: PropTypes.number
}