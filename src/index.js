import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Toggle } from './components/Toggle';
import { Board } from './components/Board';
import './styles/index.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      historyLocation: Array(9).fill(null),
      stepNumber: 0,
      xIsNext: true,
      descendingOrder: false
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

  handleToggle() {
    this.setState({
      descendingOrder: !this.state.descendingOrder
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

    const { descendingOrder } = this.state;
    if (descendingOrder) {
      moves.reverse();
    }

    const { winner, winnerPositions } = calculateWinner(current.squares) || {};
    const isLastMovement = !current.squares.includes(null);
    const status = winner
      ? `Winner: ${winner}`
      : isLastMovement
        ? 'No one wins'
        : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winnerPositions={winnerPositions}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <br></br>
          <Toggle
            descendingOrder={descendingOrder}
            onClick={() => this.handleToggle()}
          />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/**
 * Calculates if someone has won the game
 * Returns an object with the winner and the squares that caused the win
 *
 * @param {?string[]} squares - list of squares from current game
 * @returns {{winner: string, winnerPositions: number[]}|null}
 */
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
      return { winner: squares[a], winnerPositions: [a, b, c] };
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
