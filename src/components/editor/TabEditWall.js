import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { reset } from 'redux-form'
import { connect } from 'react-redux'
import FormWall from './forms/FormWall'

export default class TabEditWall extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(data) {
    this.props.actions.editWall({
      // wallIndex: this.props.wallIndex,
      wall: {
        size: {
          w: data.w,
          h: data.h,
        }
      }
    });
    this.props.actions.saveWall({
      wallIndex: this.props.wallIndex,
      tileList: this.props.tileList
    })
  }

  render() {
    return <div className="edit-general-content">
      <h2>Size</h2>
      <FormWall
          onSubmit={this.handleSubmit}
          wallIndex={this.props.wallIndex} />
    </div>
  }
}

TabEditWall.propTypes = {
  // fields: PropTypes.object.isRequired,
  wallIndex:  PropTypes.number,
  actions:    PropTypes.object
}

export default connect(undefined, {reset}) (TabEditWall)