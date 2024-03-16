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
  let gameEnded = true;

  const initializePlayers = (playerName1, playerName2) => {
    players.player1 = player(playerName1, "x");
    players.player2 = player(playerName2, "o");
    activePlayer = players.player1;
    gameEnded = false;
  };

  const isGameEnded = () => gameEnded;

  const endGame = () => (gameEnded = true);

  const getActivePlayer = () => {
    return {
      currentPlayerName: activePlayer.getName(),
      currentPlayerMarker: activePlayer.getMarker(),
    };
  };

  const getNextPlayerName = () => {
    return activePlayer === players.player1
      ? players.player2.getName()
      : players.player1.getName();
  };

  const switchPlayerTurn = () => {
    activePlayer =
      activePlayer === players.player1 ? players.player2 : players.player1;
  };

  const playRound = (index) => {
    const { currentPlayerMarker } = getActivePlayer();
    placeMarker(currentPlayerMarker, index);
    const winnerStatus = determineOutcome(activePlayer);
    if (winnerStatus !== null) {
      endGame();
    }
    switchPlayerTurn();
    return winnerStatus;
  };

  const placeMarker = (playerMarker, position) => {
    if (board[position] === null) {
      board[position] = playerMarker;
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
      return `${playerName} has won the game!`;
    } else {
      const isBoardFull = board.every((item) => item !== null);
      if (isBoardFull) {
        return `It's a draw!`;
      }
    }
    return null;
  };

  return {
    playRound,
    initializePlayers,
    getActivePlayer,
    getNextPlayerName,
    isGameEnded,
  };
})();

const displayController = (function () {
  const form = document.querySelector("form");
  const formButton = document.querySelector("form > button");
  const boardElement = document.querySelector(".grid-container");

  const handlePlayersFormSubmission = (event) => {
    event.preventDefault();
    let name1 = form.elements["player1"].value.trim();
    let name2 = form.elements["player2"].value.trim();
    if (name1 !== "" && name2 !== "") {
      if (name1 === name2) {
        updateTurnMsg("", "Player 1 and Player 2 names must be different");
      } else {
        gameBoardController.initializePlayers(name1, name2);
        updateTurnMsg(name1);
      }
    } else {
      updateTurnMsg("", "Please enter player 1 and player 2 form");
    }
  };

  formButton.addEventListener("click", handlePlayersFormSubmission);

  const updateWinnerMsg = (msg) => {
    const element = document.querySelector("#result-msg");
    element.textContent = msg;
    if (msg !== null) {
      updateTurnMsg("");
    }
  };

  const updateTurnMsg = (turnName, msg = "") => {
    const nextTurnDisplay = document.querySelector("#turn-msg");
    const statusMsg = `${turnName}'s turn !`;
    if (turnName !== "") {
      nextTurnDisplay.textContent = statusMsg;
    } else {
      nextTurnDisplay.textContent = msg;
    }
  };

  const updateScreen = (element, playerMarker, playerName) => {
    if (element.textContent !== "x" && element.textContent !== "o") {
      element.textContent = playerMarker;
      updateTurnMsg(playerName);
    }
  };

  const clickHandlerBoard = (event) => {
    const element = event.target;
    if (gameBoardController.isGameEnded()) {
      return;
    } else {
      if (element.dataset.index !== undefined) {
        const cellIndex = event.target.dataset.index;
        const nextPlayerName = gameBoardController.getNextPlayerName();
        const { currentPlayerMarker } = gameBoardController.getActivePlayer();
        updateScreen(element, currentPlayerMarker, nextPlayerName);
        const winnerStatus = gameBoardController.playRound(cellIndex);
        updateWinnerMsg(winnerStatus);
      }
    }
  };
  boardElement.addEventListener("click", clickHandlerBoard);
})();

// Stop form submission until game finish;
