import React, { Component } from "react";
import Board from "./Board";
import "./Game.css";
import { isNull } from "util";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(7)
        .fill(null)
        .map(() => Array(7).fill(null)),
      p1IsNext: true,
      p1Location: { row: null, col: null },
      p2Location: { row: null, col: null }
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

  // Function to check if the move is a legal move
  checkIfMoveLegal(row, col) {
    const playerLocation = this.state.p1IsNext
      ? this.state.p1Location
      : this.state.p2Location;

    if (isNull(playerLocation.row) && isNull(playerLocation.col)) return false;

    const moves = [
      [playerLocation.row + 2, playerLocation.col + 1],
      [playerLocation.row + 2, playerLocation.col - 1],
      [playerLocation.row - 2, playerLocation.col + 1],
      [playerLocation.row - 2, playerLocation.col - 1],
      [playerLocation.row + 1, playerLocation.col - 2],
      [playerLocation.row - 1, playerLocation.col - 2],
      [playerLocation.row + 1, playerLocation.col + 2],
      [playerLocation.row - 1, playerLocation.col + 2]
    ];

    for (let i = 0; i < moves.length; i++) {
      const [a, b] = moves[i];
      if (row === a && col === b) return false;
    }

    return true;
  }

  // Function to handle the click on a square
  handleClick(row, col) {
    const { squares } = this.state;
    const { p1Location } = this.state;
    const { p2Location } = this.state;

    if (
      this.calculateWinner(squares) ||
      squares[row][col] ||
      this.checkIfMoveLegal(row, col)
    )
      return;

    if (this.state.p1IsNext) {
      squares[row][col] = "X";
      if (p1Location.row !== null && p1Location.col !== null)
        squares[p1Location.row][p1Location.col] = "@";

      this.setState({
        squares: squares,
        p1IsNext: !this.state.p1IsNext,
        p1Location: { row: row, col: col }
      });
    } else {
      squares[row][col] = "O";
      if (p2Location.row !== null && p2Location.col !== null)
        squares[p2Location.row][p2Location.col] = "@";

      this.setState({
        squares: squares,
        p1IsNext: !this.state.p1IsNext,
        p2Location: { row: row, col: col }
      });
    }
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);

    let status;
    if (winner) status = `Winner ${winner}`;
    else status = `Next player: ${this.state.p1IsNext ? "X" : "O"}`;

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
