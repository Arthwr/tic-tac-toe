const gameBoard = (function () {
  const board = [];
  const rows = 3;
  const columns = 3;

  const placeMarker = (player, position) => {
    board[position] = player.getMarker();
    checkWinner(player);
    console.log(board);
  };

  const checkWinner = (player) => {
    let i = 0;
    let j = 0;
    let rowIndex = 0;
    let columnIndex = 0;

    // Checking the diagonal win condition
    if (
      (board[0] === board[4] && board[0] === board[8] && board[0] !== undefined) ||
      (board[2] === board[4] && board[2] === board[6] && board[2] !== undefined)
    ) {
      const name = player.getName();
      console.log(`${name} has won the game!`); 
    } else {
      
      // Checking the row win condition
      while (i < rows) {
        if (
          board[rowIndex] === board[rowIndex + 1] &&
          board[rowIndex] === board[rowIndex + 2] &&
          board[rowIndex] !== undefined
        ) {
          const name = player.getName();
          console.log(`${name} has won the game!`);
          break;
        }

        i++;
        rowIndex = i * 3;
      }

      // Checking the column win condition
      while (j < columns) {
        if (
          board[columnIndex] === board[columnIndex + 3] &&
          board[columnIndex] === board[columnIndex + 6] &&
          board[columnIndex] !== undefined
        ) {
          const name = player.getName();
          console.log(`${name} has won the game!`);
          break;
        }
        j++;
        columnIndex = j;
      }
    }
  };
  return { placeMarker, checkWinner };
})();

const player = (name, marker) => {
  let score = 0;
  let playerMarker = marker;
  const playerName = name;

  const getScore = () => score;
  const getName = () => playerName;
  const getMarker = () => playerMarker;

  return { getScore, getName, getMarker };
};

const displayController = (function () {
  return {};
})();

const player1 = player("John", "x");
const player2 = player("Mike", "o");
