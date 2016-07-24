import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { checkNumeric } from '../../../utils/validators'

export const fields = ['w', 'h']

const validate = values => {
  const errors = {}
  if (!values.w) {
    errors.w = "Required"
  } else {
    if (!checkNumeric(values.w)) {
      errors.w = "Should be a number"
    }
  }
  if (!values.h) {
    errors.h = "Required"
  } else {
    if (!checkNumeric(values.h)) {
      errors.h = "Should be a number"
    }
  }
  return errors;
}

class FormWall extends Component {
  render() {
    const {
      fields: { w, h },
      handleSubmit,
      resetForm,
      submitting,
      errors
    } = this.props

    const submitDisabled = !!Object.keys(errors).length

    return <form onSubmit={handleSubmit}>
      <TextField
          hintText="Width"
          fullWidth={true}
          name={w.name}
          onChange={w.onChange}
          errorText={w.error}
          value={w.value} />
      <br />

      <TextField
          hintText="Height"
          fullWidth={true} 
          name={h.name}
          onChange={h.onChange}
          errorText={h.error}
          value={h.value} />
      <br />

      <br />
      <br />

      <FlatButton
          disabled={submitting}
          label="Cancel"
          secondary={true}
          onClick={resetForm} />

      <RaisedButton
          label="Change"
          primary={true}
          disabled={submitting || submitDisabled}
          onClick={handleSubmit} />
    </form>;
  }
}


FormWall.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'formWall',
  fields,
  validate
},
(state, component) => {
  const { wallIndex } = component;
  const size = state.walls
    .get('list')
    .get(wallIndex)
    .get('size')
    .toJS();

  return {initialValues: size}
}
) (FormWall)