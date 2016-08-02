import React, { Component, PropTypes } from 'react'

import { reduxForm } from 'redux-form'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { rNumericValidator } from '../../../utils/validators'

export const fields = ['w', 'h']

const validate = values => {
  const errors = {}
  errors.w = rNumericValidator(values.w)
  errors.h = rNumericValidator(values.h)
  return errors
}

class FormWallAdd extends Component {
  constructor(props) {
    super(props)
    this.reset = this.reset.bind(this)
  }

  reset() {
    this.props.resetForm();
    this.props.onReset();
  }

  render() {
    const {
      fields: { w, h},
      handleSubmit,
      resetForm,
      submitting,
      errors,
      dirty
    } = this.props
    

    // const disabledAdd = (!w.value || !h.value)
    const submitDisabled = !!Object.keys(errors).length

    return <form onSubmit={handleSubmit}>
      <TextField
          hintText="Width"
          fullWidth={true}
          name={w.name}
          value={w.value}
          errorText={w.dirty && w.error}
          onChange={w.onChange}
      />
      <br />

      <TextField
          hintText="Height"
          fullWidth={true}
          name={h.name}
          value={h.value}
          errorText={h.dirty && h.error}
          onChange={h.onChange}
      />
      <br />

      <br /><br />
      <RaisedButton
          label="Add"
          primary={true}
          disabled={submitDisabled}
          onClick={handleSubmit} 
      />
      <FlatButton
          label="Cancel"
          secondary={true}
          onClick={this.reset}
      />
    </form>
  }
}

FormWallAdd.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'formWallAdd',
  fields,
  validate
}) (FormWallAdd)