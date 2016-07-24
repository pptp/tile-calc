import React, { Component, PropTypes } from 'react'

import { reduxForm } from 'redux-form'
// import { reset } from 'redux-form'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

export const fields = ['w', 'h']

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
      submitting
    } = this.props

    const disabledAdd = (!w.value || !h.value)

    return <form onSubmit={handleSubmit}>
      <TextField
          hintText="Width"
          fullWidth={true}
          name={w.name}
          value={w.value}
          onChange={w.onChange}
      />
      <br />

      <TextField
          hintText="Height"
          fullWidth={true}
          name={h.name}
          value={h.value}
          onChange={h.onChange}
      />
      <br />

      <br /><br />
      <RaisedButton
          label="Add"
          primary={true}
          disabled={disabledAdd}
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
  fields
}) (FormWallAdd)