import React, { Component } from 'react';

export class Square extends Component {
  render() {
    const { isWinnerPosition } = this.props;
    return (
      <button
        className="square"
        onClick={this.props.onClick}
        style={isWinnerPosition ? { color: 'red' } : { color: 'black' }}
      >
        {this.props.value}
      </button>
    );
  }
}