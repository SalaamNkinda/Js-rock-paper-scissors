/**
 * Rock, Paper, Scissors Game
 * 
 * This script handles the game logic for a Rock, Paper, Scissors game
 * where the player competes against the computer in a best-of-5 match.
 */

/**
 * Generates a random choice for the computer
 * @returns {string} Random choice of "Rock", "Paper", or "Scissors"
 */
function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

/**
* Determines if the player won the round
* @param {string} player - Player's choice
* @param {string} computer - Computer's choice
* @returns {boolean} True if player wins, false otherwise
*/
function hasPlayerWonTheRound(player, computer) {
  return (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Scissors" && computer === "Paper") ||
      (player === "Paper" && computer === "Rock")
  );
}

// Game state variables
let playerScore = 0;
let computerScore = 0;

/**
* Calculates the results of a single round
* @param {string} userOption - Player's choice
* @returns {string} Result message for the round
*/
function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  if (hasPlayerWonTheRound(userOption, computerResult)) {
      playerScore++;
      return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
      return `It's a tie! Both chose ${userOption}`;
  } else {
      computerScore++;
      return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

// DOM element references
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

/**
* Updates the UI with round results and checks for game winner
* @param {string} userOption - Player's choice
*/
function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption);
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  // Check if game is over (first to 3 points)
  if (playerScore === 3 || computerScore === 3) {
      winnerMsgElement.innerText = `${
          playerScore === 3 ? "Player" : "Computer"
      } has won the game!`;

      // Hide options and show reset button
      resetGameBtn.style.display = "block";
      optionsContainer.style.display = "none";
  }
}

/**
* Resets the game state and UI
*/
function resetGame() {
  // Reset scores
  playerScore = 0;
  computerScore = 0;

  // Update score display
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;

  // Show options and hide reset button
  optionsContainer.style.display = "block";
  resetGameBtn.style.display = "none";

  // Clear messages
  winnerMsgElement.innerText = "";
  roundResultsMsg.innerText = "";
}

// Event Listeners
resetGameBtn.addEventListener("click", resetGame);

// Button event handlers
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", function () {
  showResults("Rock");
});

paperBtn.addEventListener("click", function () {
  showResults("Paper");
});

scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});