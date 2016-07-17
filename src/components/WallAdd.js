require('../styles/wall.less');

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Wall extends Component {
  doAdd() {
    this.props.action({
      w: this.state.width,
      h: this.state.height,
    });
    this.doDeactivate();
  }

  doActivate() {
    this.setState({active: true});
  }
  doDeactivate() {
    this.setState({active: false});
  }
  doSetWidth(event) {
    this.setState({ width: parseFloat(event.target.value) })
  }
  doSetHeight(event) {
    this.setState({ height: parseFloat(event.target.value) })
  }

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      width: props.width,
      height: props.height
    }
  }

  render() {
    if (!this.state.active) {
      return <div className="item-add-placeholder" onClick={::this.doActivate}></div>;
    }

    const addDisabled = (!this.state.width || !this.state.height);

    return <div className="item-add">
      <TextField hintText="Width" fullWidth={true} value={this.state.width} onChange={::this.doSetWidth} /><br />
      <TextField hintText="Height" fullWidth={true} value={this.state.height} onChange={::this.doSetHeight} /><br />

      <br /><br />
      <RaisedButton label="Add" primary={true} disabled={addDisabled} onClick={::this.doAdd} />
      <FlatButton label="Cancel" secondary={true} onClick={::this.doDeactivate} />
    </div>
  }
}

Wall.propTypes = {
  action: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}