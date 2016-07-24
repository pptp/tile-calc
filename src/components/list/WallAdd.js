require('../../styles/wall.less');

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import FormWallAdd from './forms/FormWallAdd'

export default class WallAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.doAdd = this.doAdd.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  resetForm() {
    this.doDeactivate()
  }

  doAdd(data) {
    this.props.action({
      wall: {
        size: { w: data.w, h: data.h }
      }
    })
    this.doDeactivate();
  }

  doActivate() {
    this.setState({active: true});
  }
  doDeactivate() {
    this.setState({active: false});
  }
  // doSetWidth(event) {
  //   this.setState({ width: parseFloat(event.target.value) })
  // }
  // doSetHeight(event) {
  //   this.setState({ height: parseFloat(event.target.value) })
  // }


  render() {
    if (!this.state.active) {
      return <div className="item-add-placeholder"
          onClick={::this.doActivate}>
      </div>;
    }

    // const addDisabled = (!this.props.data.w || !this.props.data.h);

    return <div className="item-add">
      <FormWallAdd
          onSubmit={this.doAdd}
          onReset={this.resetForm} />
    </div>
  }
}

WallAdd.propTypes = {
  action: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}