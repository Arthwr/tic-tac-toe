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
  const board = new Array(9).fill(null);

  const placeMarker = (player, position) => {
    if (board[position] === null) {
      board[position] = player.getMarker();
      determineOutcome(player);
    }
  };

  const checkWinningCombination = () => {
    // prettier-ignore
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (const winningGroup of winConditions) {
      const marker = board[winningGroup[0]];
      if (
        marker !== null &&
        winningGroup.every((index) => board[index] === marker)
      ) {
        return true;
      }
    }
    return false;
  };

  const determineOutcome = (player) => {
    const playerName = player.getName();

    if (checkWinningCombination()) {
      console.log(`${playerName} has won the game!`);
    } else {
      const isBoardFull = board.every((item) => item !== null);
      if (isBoardFull) {
        console.log(`It's a draw!`);
      }
    }
  };
  return { placeMarker, board };
})();

const displayController = (function () {
  const displayMarker = (player, event) => {
    // element = document.querySelector(event.target)
    // element.textContent = player.playerMarker;
  }
  return {};
})();

const player1 = player("John", "x");
const player2 = player("Mike", "o");
