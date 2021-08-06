import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      historyLocation: Array(9).fill(null),
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const movement = calculatePosition(i);
    const historyLocation = this.state.historyLocation;
    historyLocation[this.state.stepNumber] = movement;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // ignore a click if someone has won the game or if a Square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares }]),
      historyLocation,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const historyLocation = this.state.historyLocation;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const description = move
        ? `Go to move #${move} (${historyLocation[move - 1].row}, ${historyLocation[move - 1].col})`
        : 'Go to game start';
      return move === this.state.stepNumber
        ? (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}><strong>{description}</strong></button>
          </li>
        )
        : (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{description}</button>
          </li>
        );
    });


    const status = winner ? `Winner: ${winner}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculatePosition(index) {
  switch (index) {
    case 0:
      return { col: 1, row: 1 };
    case 1:
      return { col: 2, row: 1 };
    case 2:
      return { col: 3, row: 1 };
    case 3:
      return { col: 1, row: 2 };
    case 4:
      return { col: 2, row: 2 };
    case 5:
      return { col: 3, row: 2 };
    case 6:
      return { col: 1, row: 3 };
    case 7:
      return { col: 2, row: 3 };
    case 8:
      return { col: 3, row: 3 };
    default:
      throw new Error('Unexpected index!!!');
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
