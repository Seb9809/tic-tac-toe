// Constants
const $GameStatus = document.querySelector(".game-notification"),
  GAME_STATE = ["", "", "", "", "", "", "", "", ""],
  WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  WIN_MESSAGE = () => `The player ${currentPlayer} has won!`,
  DRAW_MESSAGE = () => `It's a tie!`,
  CURRENT_PLAYER_TURN = () => `Player's turn: ${currentPlayer}`;

// Variables
let gameActive = true,
  currentPlayer = "O";

// Functions

function main() {
  handleStatusDisplay(CURRENT_PLAYER_TURN());
  listeners();
}

function listeners() {
  document
    .querySelector(".game-container")
    .addEventListener("click", handleCellClick);
  document
    .querySelector(".game-restart")
    .addEventListener("click", handleRestartGame);
}

function handleStatusDisplay(message) {
  $GameStatus.innerHTML = message;
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  restartGameState();
  handleStatusDisplay(CURRENT_PLAYER_TURN());
  document
    .querySelectorAll(".game-cell")
    .forEach((cell) => (cell.innerHTML = ""));
}

function handleCellClick(clickedCellEvent /** Type Event **/) {
  const clickedCell = clickedCellEvent.target;

  if (clickedCell.classList.contains("game-cell")) {
    const clickedCellIndex = Array.from(
      clickedCell.parentNode.children
    ).indexOf(clickedCell);

    if (GAME_STATE[clickedCellIndex] !== "" || !gameActive) return false;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }
}

function handleCellPlayed(clickedCell /** object HTML **/, clickedCellIndex) {
  GAME_STATE[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
  let roundWon = false;

  for (let i = 0; i < WINNINGS.length; i++) {
    const winCondition = WINNINGS[i];

    let position1 = GAME_STATE[winCondition[0]],
      position2 = GAME_STATE[winCondition[1]],
      position3 = GAME_STATE[winCondition[2]];

    if (position1 === "" || position2 === "" || position3 === "") {
      continue;
    }
    if (position1 === position2 && position2 === position3) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    handleStatusDisplay(WIN_MESSAGE());
    gameActive = false;
    return;
  }

  let roundDraw = !GAME_STATE.includes("");
  if (roundDraw) {
    handleStatusDisplay(DRAW_MESSAGE());
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  handleStatusDisplay(CURRENT_PLAYER_TURN());
}

function restartGameState() {
  let i = GAME_STATE.length;
  while (i--) {
    GAME_STATE[i] = "";
  }
}

main();
