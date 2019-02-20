import React, { Component } from "react";
import Board from "./Board";
import "./Game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(3)
        .fill(null)
        .map(() => Array(3).fill(null)),
      xIsNext: true
    };
  }

  calculateWinner(squares) {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [[a, b], [c, d], [e, f]] = lines[i];
      if (
        squares[a][b] &&
        squares[a][b] === squares[c][d] &&
        squares[a][b] === squares[e][f]
      ) {
        return squares[a][b];
      }
    }
    return null;
  }

  handleClick(row, col) {
    // console.log(`[${row}, ${col}]`);
    const squares = this.state.squares;

    if (this.calculateWinner(squares) || squares[row][col]) return;
    // console.log("THIS IS THE THING" + squares);
    squares[row][col] = this.state.xIsNext ? "X" : "O";
    // console.log("THIS IS THE THING" + squares);

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
    // console.log(this.state.squares);
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);

    let status;
    if (winner) status = `Winner ${winner}`;
    else status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(row, col) => this.handleClick(row, col)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

export default Game;
