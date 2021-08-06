import React, { Component, Fragment } from 'react';
import '../styles/toggle.css';

export class Toggle extends Component {

  render() {
    return (
      <Fragment>
        <p>Showing movements in {this.props.descendingOrder ? 'descending' : 'ascending'} order</p>
        <p>Use the switch to change the order</p>
        <label className="switch">
          <input type="checkbox" onClick={this.props.onClick}></input>
          <span className="slider"></span>
        </label>
      </Fragment>
    );
  }
}
