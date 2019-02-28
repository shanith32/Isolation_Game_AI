class AiAgent {
  // Count legal moves
  static countLegalMoves(state) {
    let playerLocation = state.p1Location;
    let isAvailable = [0, 0];

    // if (
    //   (state.p1Location.row === null && state.p1Location.col) === null ||
    //   (state.p2Location.row === null && state.p2Location.col === null)
    // )
    //   return false;

    for (let j = 0; j < 2; j++) {
      const moves = [
        [1, playerLocation.row + 2, playerLocation.col + 1],
        [2, playerLocation.row + 2, playerLocation.col - 1],
        [3, playerLocation.row - 2, playerLocation.col + 1],
        [4, playerLocation.row - 2, playerLocation.col - 1],
        [5, playerLocation.row + 1, playerLocation.col - 2],
        [6, playerLocation.row - 1, playerLocation.col - 2],
        [7, playerLocation.row + 1, playerLocation.col + 2],
        [8, playerLocation.row - 1, playerLocation.col + 2]
      ];

      for (let i = 0; i < moves.length; i++) {
        const [n, a, b] = moves[i];
        if (a >= 0 && a < 7 && b >= 0 && b < 7) {
          if (state.squares[a][b] === null) isAvailable[j]++;
        }
      }

      playerLocation = state.p2Location;
    }

    return isAvailable;
  }

  // Check if game over
  static checkGameOver(state) {
    const availableMoves = countLegalMoves(state);
    let result = false;

    if (!availableMoves[0]) result = "🐴";
    else if (!availableMoves[1]) result = "🦄";

    return result;
  }

  // Static Evaluation Function
  static SEF(state) {
    const availableMoves = this.countLegalMoves(state);
    console.log("Available moves: ", availableMoves);
    const result = availableMoves[0] - availableMoves[1];

    return result;
  }

  // Get the children of a state
  static getChildren(state) {
    let playerLocation = state.p1Location;
    let children = [];

    // if (
    //   (state.p1Location.row === null && state.p1Location.col) === null ||
    //   (state.p2Location.row === null && state.p2Location.col === null)
    // )
    //   return false;

    console.log(" 1 Original state");
    console.log(state.squares);

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
        if (state.squares[a][b] === null) {
          console.log("a: ", a, " b: ", b);

          let newSquares = state.squares.map(array => array.slice());
          newSquares[0][0] = "@";
          newSquares[a][b] = "X";
          children.push(newSquares);
        }
      }
    }

    console.log(" 2 Original state");
    console.log(state.squares);

    return children;
  }

  // Minimax search algorithm
  minimax(currentState, depth, maximizingPlayer) {
    if (depth == 0 || checkGameOver(currentState)) return SEF(currentState);

    // Get all the children states for the currentState
    const children = this.getChildren(currentState);

    if (maximizingPlayer) {
      let maxEvaluation = -Infinity;

      children.forEach(child => {
        const evaluation = minimax(child, depth - 1, false);
        maxEvaluation = Math.max(maxEvaluation, evaluation);
      });
      return maxEvaluation;
    } else {
      let minEvaluation = Infinity;

      children.forEach(child => {
        const evaluation = minimax(child, depth - 1, true);
        minEvaluation = (minEvaluation, evaluation);
      });
      return minEvaluation;
    }
  }
}

//
//
// Test case
const state = {
  squares: Array(7)
    .fill(null)
    .map(() => Array(7).fill(null)),
  p1Location: { row: null, col: null },
  p2Location: { row: null, col: null }
};

console.log("First State: ", state.squares);
console.log(AiAgent.getChildren(state));
// console.log(AiAgent.SEF(state));

// export default AiAgent;
