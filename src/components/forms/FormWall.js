import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export const fields = ['w', 'h']

class FormWall extends Component {
  render() {
    const {
      fields: { w, h },
      handleSubmit,
      resetForm,
      submitting
    } = this.props

    return <form onSubmit={handleSubmit}>
      <TextField
          hintText="Width"
          fullWidth={true}
          name={w.name}
          onChange={w.onChange}
          value={w.value} />
      <br />

      <TextField
          hintText="Height"
          fullWidth={true} 
          name={h.name}
          onChange={h.onChange}
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
          disabled={submitting}
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
  fields
},
(state, component) => {
  const { wallIndex } = component;
  const size = state.walls
    .get('list')[wallIndex].size;

  return {initialValues: size}
}
) (FormWall)