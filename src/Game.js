import React, { Component } from "react";
import Board from "./Board";
import "./Game.css";
import { isNull } from "util";
const AiAgent = require("./AiAgent").default;

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

  // Calculate the winner
  calculateWinner() {
    let playerLocation = this.state.p1Location;
    let isAvailable = [0, 0];

    if (
      (isNull(this.state.p1Location.row) &&
        isNull(this.state.p1Location.col)) ||
      (isNull(this.state.p2Location.row) && isNull(this.state.p2Location.col))
    )
      return false;

    for (let j = 0; j < 2; j++) {
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
        if (a >= 0 && a < 7 && b >= 0 && b < 7) {
          if (isNull(this.state.squares[a][b])) isAvailable[j]++;
        }
      }

      playerLocation = this.state.p2Location;
    }

    let result = false;

    if (!isAvailable[0]) result = "🐴";
    else if (!isAvailable[1]) result = "🦄";

    return result;
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
    const { p2Location } = this.state;

    if (
      this.calculateWinner() ||
      squares[row][col] ||
      this.checkIfMoveLegal(row, col)
    )
      return;
    if (!this.state.p1IsNext) {
      squares[row][col] = "🐴";
      if (p2Location.row !== null && p2Location.col !== null)
        squares[p2Location.row][p2Location.col] = "@";

      this.setState({
        squares: squares,
        p1IsNext: !this.state.p1IsNext,
        p2Location: { row: row, col: col }
      });
    }
  }

  // Function to move the AI
  moveAi() {
    const { squares, p1Location, p2Location, p1IsNext } = this.state;

    if (
      (p1Location.row !== null && p1Location.col !== null) ||
      (p2Location.row !== null && p2Location.col !== null)
    ) {
      const newAI = new AiAgent();
      const move = newAI.getMove(newAI.minimax(this.state, 8, true));
      console.log("Move: ", move);
      if (move) {
        this.setState({
          squares: move.state.squares,
          p1IsNext: !p1IsNext,
          p1Location: {
            row: move.state.p1Location.row,
            col: move.state.p1Location.col
          }
        });
      } else return;
    } else {
      const row = Math.floor(Math.random() * 7);
      const col = Math.floor(Math.random() * 7);

      squares[row][col] = "🦄";
      if (p1Location.row !== null && p1Location.col !== null)
        squares[p1Location.row][p1Location.col] = "@";

      this.setState({
        squares: squares,
        p1IsNext: !p1IsNext,
        p1Location: {
          row: row,
          col: col
        }
      });
    }
  }

  render() {
    const winner = this.calculateWinner();

    if (this.state.p1IsNext && !winner) this.moveAi();

    let status;
    if (winner) status = `Winner ${winner}`;
    else status = `${this.state.p1IsNext ? "🦄" : "🐴"}'s Turn`;

    return (
      <div className="game">
        <div className="game-info">
          <div className="game-name">The Isolation Game</div>
          <div>{status}</div>
        </div>
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(row, col) => this.handleClick(row, col)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
