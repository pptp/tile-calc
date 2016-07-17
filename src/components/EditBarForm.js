import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { Map } from 'immutable'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class EditBarForm extends Component {

  doSetName(event) {
    this.setState({ bar: this.state.bar.update('name', () => event.target.value) });
  }
  doSetX(event) {
    this.setState({ bar: this.state.bar.update('x', () => event.target.value) });
  }
  doSetY(event) {
    this.setState({ bar: this.state.bar.update('y', () => event.target.value) });
  }
  doSetW(event) {
    this.setState({ bar: this.state.bar.update('w', () => event.target.value) });
  }
  doSetH(event) {
    this.setState({ bar: this.state.bar.update('h', () => event.target.value) });
  }

  isChanged() {
    return this.props.bar.equals(this.state.bar);
  }
  doReset(props) {
    this.setState({
      bar: props ? props.bar : this.props.bar
    });
  }
  doSave() {
    // TODO!!!
    this.props.actions.editBar({
      wallIndex: this.props.wallIndex,
      barIndex: this.props.barIndex,
      bar: this.state.bar
    });
  }
  doDelete() {
    this.props.actions.removeBar({
      wallIndex: this.props.wallIndex,
      barIndex: this.props.barIndex,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.doReset(nextProps)
  }

  constructor(props) {
    super(props);
    this.state = {
      bar: props.bar
    }
  }

  render() {
    const bar = this.state.bar;

    const leftFieldStyle = {
      width: '45%',
    }
    const rightFieldStyle = {
      width: '45%',
      marginLeft: '10%'
    }

    return <div>
      <TextField
          floatingLabelText="Name"
          hintText="Name"
          fullWidth={true}
          value={bar.get('name') || ''}
          onChange={::this.doSetName} /><br />
    
      <TextField
          floatingLabelText="Position X"
          hintText="Position X"
          value={bar.get('x') || ''}
          style={leftFieldStyle}
          onChange={::this.doSetX} />
    
      <TextField
          floatingLabelText="Position Y"
          hintText="Position Y"
          value={bar.get('y') || ''}
          style={rightFieldStyle}
          onChange={::this.doSetY} />
    
      <TextField
          floatingLabelText="Width"
          hintText="Width"
          value={bar.get('w') || ''}
          style={leftFieldStyle}
          onChange={::this.doSetW} />

      <TextField
          floatingLabelText="Height"
          hintText="Height"
          value={bar.get('h') || ''}
          style={rightFieldStyle}
          onChange={::this.doSetH} />

      <br /><br />
      <RaisedButton
          label="Delete"
          secondary={true}
          onClick={::this.doDelete} />

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
    </div>;
  }
}

EditBarForm.propTypes = {
  bar: PropTypes.instanceOf(Map),
  wallIndex: PropTypes.number,
  barIndex: PropTypes.number
}