import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { reset } from 'redux-form'
import { connect } from 'react-redux'
import FormWall from '../forms/FormWall'

export default class TabEditWall extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    // this.resetForm = this.resetForm.bind(this)
  }

  handleSubmit(data) {
    const wall = {
      size: {
        w: data.w,
        h: data.h,
      }
    }

    this.props.action({
      index: this.props.wallIndex,
      wall: wall
    });

  }
  // resetForm() {
  //   this.props.reset('formWall')
  // }

  render() {
    // console.log(this.props.wall)

    return <div className="edit-general-content">
      <h2>Size</h2>
      <FormWall onSubmit={this.handleSubmit} wallIndex={this.props.wallIndex} />
    </div>
  }
}

TabEditWall.propTypes = {
  // fields: PropTypes.object.isRequired,
  wallIndex:  PropTypes.number,
  action:     PropTypes.func
}

export default connect(undefined, {reset}) (TabEditWall)