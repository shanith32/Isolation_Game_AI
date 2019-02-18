import React, { Component } from "react";
import Square from "./Square";
import "./Board.css";

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createBoard() {
    let board = [];
    let count = 0;

    for (let i = 0; i < 3; i++) {
      let squares = [];
      for (let j = 0; j < 3; j++) {
        squares.push(this.renderSquare(count));
        count += 1;
      }
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
