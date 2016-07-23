import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { Map } from 'immutable'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import mixin from 'mixin';
import Form from './mixins/Form'

// https://github.com/mozilla-services/react-jsonschema-form

export default class EditdataForm extends Component {

  doSetName(event) {
    this.setState({
      data: this.state.data.update('name', () => event.target.value),
    });
  }
  doSetX(event) {
    const state = this.state.errors;
    this.setState({
      data: this.state.data.update('x', () => event.target.value.replace(/[^0-9\.]/g, '') ),
      // errors: { ...state, x: false}
    });
  }
  doSetY(event) {
    const state = this.state.errors;
    this.setState({
      data: this.state.data.update('y', () => event.target.value.replace(/[^0-9\.]/g, '') ),
      // errors: { ...state, y: false}
    });
  }
  doSetW(event) {
    const state = this.state.errors;
    this.setState({
      data: this.state.data.update('w', () => event.target.value.replace(/[^0-9\.]/g, '') ),
      // errors: { ...state, w: false}
    });
  }
  doSetH(event) {
    const state = this.state.errors;
    this.setState({
      data: this.state.data.update('h', () => event.target.value.replace(/[^0-9\.]/g, ''),
      // errors: { ...state, h: false}
    )});
  }

  isChanged() {
    return this.props.data.equals(this.state.data);
  }


  doReset() {
    debugger;
    this.reset();
  }
  doSave() {
    // TODO!!!
    this.props.actions.editdata({
      wallIndex: this.props.wallIndex,
      dataIndex: this.props.dataIndex,
      data: this.state.data
    });
  }
  doDelete() {
    this.props.actions.removedata({
      wallIndex: this.props.wallIndex,
      dataIndex: this.props.dataIndex,
    })
  }
  /*
    doValidate() {
      const errors = {};
      let hasErrors = false;
      
      ['x', 'y', 'w', 'h'].forEach(key => {
        const value = parseFloat(this.state[key]);
        if (isNaN(value)) {
          errors[key] = 'Should be a number';
        }
        if (!value) {
          errors[key] = 'Should not be zero';
        }
      });

      if (hasErrors) {
        this.setState({
          errors: errors
        });
      }
      return hasErrors;
    }
  */

  componentWillReceiveProps(nextProps) {
    this.reset(nextProps)
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      errors: {}
    }
  }

  render() {
    const {data, errors} = this.state;


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
          value={data.get('name') || ''}
          onChange={::this.doSetName} /><br />
    
      <TextField
          floatingLabelText="Position X"
          hintText="Position X"
          value={data.get('x') || ''}
          style={leftFieldStyle}
          errorText={errors['x']}
          onChange={::this.doSetX} />
    
      <TextField
          floatingLabelText="Position Y"
          hintText="Position Y"
          value={data.get('y') || ''}
          style={rightFieldStyle}
          onChange={::this.doSetY} />
    
      <TextField
          floatingLabelText="Width"
          hintText="Width"
          value={data.get('w') || ''}
          style={leftFieldStyle}
          onChange={::this.doSetW} />

      <TextField
          floatingLabelText="Height"
          hintText="Height"
          value={data.get('h') || ''}
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

EditdataForm.propTypes = {
  data: PropTypes.instanceOf(Map),
  wallIndex: PropTypes.number,
  dataIndex: PropTypes.number
}

console.log(Form)
EditdataForm = mixin(EditdataForm, Form)