import React, { Component } from "react";
import Square from "./Square";
import "./Board.css";

class Board extends Component {
  renderSquare(row, col) {
    let squareCssType = "oddSquare";
    let squareValue = this.props.squares[row][col];

    if (squareValue === "@") {
      squareCssType = "usedSquare";
      squareValue = null;
    } else if (row % 2 === 0) {
      if (col % 2 === 0) squareCssType = "evenSquare";
    } else {
      if (col % 2 !== 0) squareCssType = "evenSquare";
    }

    return (
      <Square
        key={Math.random()}
        value={squareValue}
        onClick={() => this.props.onClick(row, col)}
        squareColor={squareCssType}
      />
    );
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 7; i++) {
      let squares = [];
      for (let j = 0; j < 7; j++) squares.push(this.renderSquare(i, j));

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
