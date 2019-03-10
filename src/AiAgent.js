class AiAgent {
  constructor() {
    this.levelOneNodes = [];
    this.initialDepth = null;
  }

  // Count legal moves
  countLegalMoves(state) {
    let playerLocation = state.p1Location;
    let isAvailable = [0, 0];

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
          if (state.squares[a][b] === null) isAvailable[j]++;
        }
      }

      playerLocation = state.p2Location;
    }

    return isAvailable;
  }

  // Check if game over
  checkGameOver(state) {
    const availableMoves = this.countLegalMoves(state);
    let result = false;

    if (!availableMoves[0]) result = "🐴";
    else if (!availableMoves[1]) result = "🦄";

    return result;
  }

  // Static Evaluation Function
  SEF(state) {
    const availableMoves = this.countLegalMoves(state);
    const result = availableMoves[0] - availableMoves[1];
    return result;
  }

  // Get the children of a state
  getChildren(state, isPlayer1) {
    let playerLocation;
    if (isPlayer1) playerLocation = state.p1Location;
    else playerLocation = state.p2Location;
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
          if (isPlayer1) {
            let newState = {
              squares: state.squares.map(array => array.slice()),
              p1Location: { row: a, col: b },
              p2Location: {
                row: state.p2Location.row,
                col: state.p2Location.col
              }
            };

            newState.squares[playerLocation.row][playerLocation.col] = "@";
            newState.squares[a][b] = "🦄";
            children.push(newState);
          } else {
            let newState = {
              squares: state.squares.map(array => array.slice()),
              p1Location: {
                row: state.p1Location.row,
                col: state.p1Location.col
              },
              p2Location: { row: a, col: b }
            };

            newState.squares[playerLocation.row][playerLocation.col] = "@";
            newState.squares[a][b] = "🐴";
            children.push(newState);
          }
        }
      }
    }

    return children;
  }

  // Minimax search algorithm
  minimax(currentState, depth, maximizingPlayer) {
    // Set the initialDepth
    if (this.initialDepth === null) this.initialDepth = depth;

    if (depth === 0 || this.checkGameOver(currentState)) {
      return this.SEF(currentState);
    }

    // Get all the children states for the currentState
    const children = this.getChildren(currentState, maximizingPlayer);

    if (maximizingPlayer) {
      let maxEvaluation = -Infinity;

      children.forEach(child => {
        const evaluation = this.minimax(child, depth - 1, false);
        maxEvaluation = Math.max(maxEvaluation, evaluation);
        if (depth === this.initialDepth)
          this.levelOneNodes.push({ state: child, eval: evaluation });
      });
      return maxEvaluation;
    } else {
      let minEvaluation = Infinity;

      children.forEach(child => {
        const evaluation = this.minimax(child, depth - 1, true);
        minEvaluation = Math.min(minEvaluation, evaluation);
        if (depth === this.initialDepth)
          this.levelOneNodes.push({ state: child, eval: evaluation });
      });
      return minEvaluation;
    }
  }

  getMove(evaluation) {
    const result =
      this.levelOneNodes.length !== 0
        ? this.levelOneNodes.find(node => node.eval === evaluation)
        : false;
    return result;
  }
}

export default AiAgent;

//
//
// Test case
// const state = {
//   squares: [
//     ["O", null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, "X", null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null]
//   ],
//   p1Location: { row: 2, col: 2 },
//   p2Location: { row: 0, col: 0 }
// };

// if (
//   (state.p1Location.row !== null && state.p1Location.col !== null) ||
//   (state.p2Location.row !== null && state.p2Location.col !== null)
// ) {
//   const newAI = new AiAgent();
//   // console.log("Minimax result: ", newAI.minimax(state, 1, true));
//   console.log("Move : ", newAI.getMove(newAI.minimax(state, 1, true)));
// }
