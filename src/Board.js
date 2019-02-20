import React, { Component } from "react";
import Square from "./Square";
import "./Board.css";

class Board extends Component {
  renderSquare(row, col) {
    // console.log(`Row: ${row} Col: ${col} Key: ${row * 2 + col * 3}`);
    return (
      <Square
        key={row * 2 + col * 3}
        value={this.props.squares[row][col]}
        onClick={() => this.props.onClick(row, col)}
      />
    );
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 3; i++) {
      let squares = [];
      for (let j = 0; j < 3; j++) squares.push(this.renderSquare(i, j));

      board.push(
        <div key={i} className="board-row">
          {squares}
        </div>
      );
    }
    return board;
  }

  render() {
    return <div>{this.createBoard()}</div>;
  }
}

export default Board;
