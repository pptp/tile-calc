import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { Map } from 'immutable';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

export default class WallEditGeneral extends Component {
  doSetWidth(event) {
    this.setState({
      wall: this.state.wall.update('size', size => 
        size.update('w', () => parseFloat(event.target.value)))
    });
  }
  doSetHeight(event) {
    this.setState({
      wall: this.state.wall.update('size', size => 
        size.update('h', () => parseFloat(event.target.value)))
    });
  }
  doSave() {
    this.props.action(this.state.wall);
  }

  isChanged() {
    return this.props.wall.equals(this.state.wall);
  }
  doReset(props) {
    this.setState({
      wall: props ? props.wall : this.props.wall
    });
  }

  componentWillReceiveProps(nextProps) {
    this.doReset(nextProps)
  }

  constructor(props) {
    super(props);
    this.state = {
      wall: props.wall
    }
  }
  
  render() {
    const { save } = this.props;

    const w = this.state.wall.get('size').get('w')
    const h = this.state.wall.get('size').get('h')

    return <div className="edit-general">
      <Paper>
        <div className="edit-general-content">
          <h2>Size</h2>

          <TextField
              hintText="Width"
              fullWidth={true}
              value={w}
              onChange={::this.doSetWidth} /><br />

          <TextField
              hintText="Height"
              fullWidth={true}
              value={h}
              onChange={::this.doSetHeight} /><br />

          <br /><br />
          <FlatButton
              disabled={this.isChanged()}
              label="Cancel"
              secondary={true}
              onClick={::this.doReset} />

          <RaisedButton
              label="Change"
              primary={true}
              disabled={this.isChanged()}
              onClick={::this.doSave} />
        </div>
      </Paper>
    </div>
  }
}

WallEditGeneral.propTypes = {
  wall: PropTypes.instanceOf(Map),
  action: React.PropTypes.func.isRequired
}