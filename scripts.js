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

const gameBoardController = (function () {
  const board = new Array(9).fill(null);

  let activePlayer;

  const initializePlayers = (playerName1, playerName2) => {
    players.player1 = player(playerName1, "x");
    players.player2 = player(playerName2, "o");
    activePlayer = players.player1;
  };

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer =
      activePlayer === players.player1 ? players.player2 : players.player1;
  };

  const playRound = (index) => {
    const currentPlayer = getActivePlayer();
    placeMarker(currentPlayer, index);
    determineOutcome(currentPlayer);
    switchPlayerTurn();
    return currentPlayer.getMarker();
  };

  const placeMarker = (player, position) => {
    if (board[position] === null) {
      let marker = player.getMarker();
      board[position] = player.getMarker();
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
        winningGroup.every((cellIndex) => board[cellIndex] === marker)
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

  return { playRound, initializePlayers, board };
})();

const displayController = (function () {
  const form = document.querySelector("form");
  const formButton = document.querySelector("form > button");
  const boardElement = document.querySelector(".grid-container");

  const handlePlayersFormSubmission = (event) => {
    event.preventDefault();
    let name1 = form.elements["player1"].value;
    let name2 = form.elements["player2"].value;
    gameBoardController.initializePlayers(name1, name2);
  };

  formButton.addEventListener("click", handlePlayersFormSubmission);

  const renderMarker = (element, playerMarker) => {
    element.textContent = playerMarker;
  };

  const clickHandlerBoard = (event) => {
    const element = event.target;
    const cellIndex = event.target.dataset.index;
    const currentPlayerMarker = gameBoardController.playRound(cellIndex);
    renderMarker(element, currentPlayerMarker);
  };
  boardElement.addEventListener("click", clickHandlerBoard);
  return {};
})();
