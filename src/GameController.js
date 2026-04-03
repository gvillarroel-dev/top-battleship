import { showShipPlacement } from "./DisplayController.js";
import { Player } from "./Player.js";

export const initGameController = () => {
	const playerOneBoardElement = document.querySelector(".game__board-p1");
	const playerTwoBoardElement = document.querySelector(".game__board-p2");

	let playerOne = null;
	let playerTwo = null;
	let activePlayer = null;
	let selectedGameMode = null;

	const setupPlayers = (mode) => {
		playerOne = Player("Player 1");
		activePlayer = playerOne;

		if (mode === "singleplayer") {
			playerTwo = Player("Computer");
		} else {
			playerTwo = Player("Player 2");
		}
	};

	const handleModeSelection = (event) => {
		const singlePlayerButton = event.target.closest(".mode__btn--single");
		const multiPlayerButton = event.target.closest(
			".mode__btn--multiplayer",
		);

		if (singlePlayerButton) {
			selectedGameMode = "singleplayer";
			setupPlayers(selectedGameMode);
			showShipPlacement(playerOne, playerOneBoardElement);
		}

		if (multiPlayerButton) {
			selectedGameMode = "multiplayer";
			setupPlayers(selectedGameMode);
			showShipPlacement(playerOne, playerOneBoardElement);
		}
	};

	const initGame = () => {
		const modeSelectorElement = document.querySelector(".mode-select");
		modeSelectorElement.addEventListener("click", handleModeSelection);
	};

	return {
		initGame,
	};
};
