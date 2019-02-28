class AiAgent {
  // Count legal moves
  static countLegalMoves(state) {
    let playerLocation = state.p1Location;
    let isAvailable = [0, 0];

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
    const availableMoves = this.countLegalMoves(state);
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
          let newState = {
            squares: null,
            p1Location: { row: null, col: null },
            p2Location: { row: null, col: null }
          };

          newState.squares = state.squares.map(array => array.slice());
          newState.squares[playerLocation.row][playerLocation.col] = "@";
          newState.squares[a][b] = "X";
          newState.p1Location.row = a;
          newState.p1Location.col = b;
          children.push(newState);
        }
      }
    }

    return children;
  }

  // Minimax search algorithm
  static minimax(currentState, depth, maximizingPlayer) {
    if (depth == 0 || this.checkGameOver(currentState))
      return this.SEF(currentState);

    // Get all the children states for the currentState
    const children = this.getChildren(currentState);
    console.log("ALL CHILDREN");
    console.log(children);

    if (maximizingPlayer) {
      let maxEvaluation = -Infinity;

      children.forEach(child => {
        const evaluation = this.minimax(child, depth - 1, false);
        maxEvaluation = Math.max(maxEvaluation, evaluation);
      });
      return maxEvaluation;
    } else {
      let minEvaluation = Infinity;

      children.forEach(child => {
        const evaluation = this.minimax(child, depth - 1, true);
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
  squares: [
    ["X", null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, "O", null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ],
  p1Location: { row: 0, col: 0 },
  p2Location: { row: 2, col: 2 }
};

if (
  (state.p1Location.row !== null && state.p1Location.col !== null) ||
  (state.p2Location.row !== null && state.p2Location.col !== null)
) {
  console.log("Minimax result: ", AiAgent.minimax(state, 1, true));
}

// console.log("First State: ", state.squares);
// console.log(AiAgent.getChildren(state));
// console.log(AiAgent.SEF(state));

// export default AiAgent;
