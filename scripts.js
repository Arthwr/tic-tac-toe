const players = {};

const player = (name, marker) => {
  let score = 0;
  let playerMarker = marker;
  const playerName = name;

  const getScore = () => score;
  const getName = () => playerName;
  const getMarker = () => playerMarker;

  return { getScore, getName, getMarker };
};  

const initializeForm = () => {
  const form = document.querySelector("form");
  const formButton = document.querySelector("form > button");

  const handlePlayersFormSubmission = (event) => {
    event.preventDefault();
    let name1 = form.elements["player1"].value;
    let name2 = form.elements["player2"].value; 
    players.player1 = player(name1, "x");
    players.player2 = player(name2, "o");
  };

  formButton.addEventListener("click", handlePlayersFormSubmission);
};

const gameBoardController = (function () {
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

  return { placeMarker };
})();

const displayController = (function () {
  const boardElement = document.querySelector(".grid-container");

  const renderMarker = (element) => {
    element.textContent = "";
  };

  const clickHandlerBoard = (event) => {
    const element = event.target;
    playRound();
    renderMarker(element);
  };
  boardElement.addEventListener("click", clickHandlerBoard);
  return {};
})();

initializeForm();

//  To make that function
// const playRound = () => {
//   const activePlayer = player.getActivePlayer();
//   placeMarker(activePlayer, cellIndex);
// };
// Handling form submission for new players
