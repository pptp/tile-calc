import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {
  rNumericValidator,
  requireValidator
} from '../../../utils/validators'

export const fields = ['name', 'w', 'h', 'x', 'y']

const validate = values => {
  const errors = {}

  errors.x = rNumericValidator(values.x)
  errors.y = rNumericValidator(values.y)
  errors.w = rNumericValidator(values.w)
  errors.h = rNumericValidator(values.h)
  errors.name = requireValidator(values.name)

  return errors
}

class FormBar extends Component {
  render() {
    const {
      fields: { name, w, h, x, y},
      handleSubmit,
      resetForm,
      submitting,
      onDelete,
      errors
    } = this.props

    const leftFieldStyle = {
      width: '45%',
    }
    const rightFieldStyle = {
      width: '45%',
      marginLeft: '10%'
    }

    const submitDisabled = !!Object.keys(errors).length

    return <form onSubmit={handleSubmit}>
      <TextField
          floatingLabelText="Bar Name"
          hintText="Name"
          fullWidth={true}
          name={name.name}
          onChange={name.onChange}
          errorText={name.dirty && name.error}
          value={name.value} />
      <br />
      
      <TextField
          floatingLabelText="Position X"
          hintText="Position X"
          style={leftFieldStyle}
          name={x.name}
          onChange={x.onChange}
          errorText={x.dirty && x.error}
          value={x.value} />

      <TextField
          floatingLabelText="Position Y"
          hintText="Position Y"
          style={rightFieldStyle}
          name={y.name}
          onChange={y.onChange}
          errorText={y.dirty && y.error}
          value={y.value} />


      <TextField
          floatingLabelText="Width"
          hintText="Width"
          style={leftFieldStyle}
          name={w.name}
          onChange={w.onChange}
          errorText={w.dirty && w.error}
          value={w.value} />

      <TextField
          floatingLabelText="Height"
          hintText="Height"
          style={rightFieldStyle}
          name={h.name}
          onChange={h.onChange}
          errorText={h.dirty && h.error}
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
          disabled={submitDisabled || submitting}
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
  fields,
  validate
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