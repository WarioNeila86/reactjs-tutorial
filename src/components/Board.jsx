import React, { Component } from 'react';
import { Square } from './Square';

export class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = [];
    let offset = 0;
    for (let row = 0; row < 3; row++) {
      const columns = [];
      for (let col = 0; col < 3; col++) {
        columns.push(this.renderSquare(col + offset));
      }
      offset += 3;
      rows.push(<div key={row} className="board-row">{columns}</div>);
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}