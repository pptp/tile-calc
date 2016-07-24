import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export const fields = ['name', 'w', 'h', 'x', 'y']

class FormBar extends Component {
  render() {
    const {
      fields: { name, w, h, x, y},
      handleSubmit,
      resetForm,
      submitting,
      onDelete
    } = this.props

    const leftFieldStyle = {
      width: '45%',
    }
    const rightFieldStyle = {
      width: '45%',
      marginLeft: '10%'
    }

    return <form onSubmit={handleSubmit}>
      <TextField
          floatingLabelText="Bar Name"
          hintText="Name"
          fullWidth={true}
          name={name.name}
          onChange={name.onChange}
          value={name.value} />
      <br />
      
      <TextField
          floatingLabelText="Position X"
          hintText="Position X"
          style={leftFieldStyle}
          name={x.name}
          onChange={x.onChange}
          value={x.value} />

      <TextField
          floatingLabelText="Position Y"
          hintText="Position Y"
          style={rightFieldStyle}
          name={y.name}
          onChange={y.onChange}
          value={y.value} />


      <TextField
          floatingLabelText="Width"
          hintText="Width"
          style={leftFieldStyle}
          name={w.name}
          onChange={w.onChange}
          value={w.value} />

      <TextField
          floatingLabelText="Height"
          hintText="Height"
          style={rightFieldStyle}
          name={h.name}
          onChange={h.onChange}
          value={h.value} />

      <br />
      <br />

      <RaisedButton
          label="Delete"
          secondary={true}
          onClick={onDelete} />

      <FlatButton
          disabled={submitting}
          label="Cancel"
          secondary={true}
          onClick={resetForm} />

      <RaisedButton
          label="Change"
          primary={true}
          disabled={submitting}
          onClick={handleSubmit} />
    </form>

  }
}

FormBar.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  wallIndex: PropTypes.number,
  barIndex: PropTypes.number,
}

export default reduxForm({
  form: 'formBar',
  fields
},
(state, component) => {
  const { wallIndex, barIndex } = component;
  const bar = state.walls
    .get('list')
    .get(wallIndex)
    .get('bar')
    .get(barIndex)
    .toJS();

  return {initialValues: bar}
}
) (FormBar)