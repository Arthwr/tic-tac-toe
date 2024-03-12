const player = (name, marker) => {
  let score = 0;
  let playerMarker = marker;
  const playerName = name;

  const getScore = () => score;
  const getName = () => playerName;
  const getMarker = () => playerMarker;

  return { getScore, getName, getMarker };
};

const gameBoard = (function () {
  const board = [];

  const placeMarker = (player, position) => {
    if (board[position] === undefined) {
      board[position] = player.getMarker();
      determineOutcome(player);
    }
  };

  const checkWinningCombination = () => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (const winningGroup of winConditions) {
      const marker = board[winningGroup[0]];
      if (
        marker !== undefined &&
        winningGroup.every((index) => board[index] === marker)
      ) {
        return true;
      }
    }
    return false;
  };

  const determineOutcome = (player) => {
    const playerName = player.getName();
    const isBoardFull = board.slice(0, 8).every((item) => item !== undefined);

    if (checkWinningCombination()) {
      console.log(`${playerName} has won the game!`);
    } else if (isBoardFull) {
      console.log(`Its a draw!`);
    }
  };
  return { placeMarker };
})();

const displayController = (function () {
  return {};
})();

const player1 = player("John", "x");
const player2 = player("Mike", "o");
