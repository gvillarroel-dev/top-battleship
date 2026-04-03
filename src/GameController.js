import { showShipPlacement, updateBoard } from "./DisplayController.js";
import { Player } from "./Player.js";
import { Ship } from "./Ship.js";

export const initGameController = () => {
	const playerOneBoardElement = document.querySelector(".game__board-p1");
	const playerTwoBoardElement = document.querySelector(".game__board-p2");

	let playerOne = null;
	let playerTwo = null;
	let activePlayer = null;
	let selectedGameMode = null;
	let selectedShip = null;
	let orientation = "horizontal";

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
		const multiPlayerButton = event.target.closest(".mode__btn--multiplayer");

		if (singlePlayerButton) {
			selectedGameMode = "singleplayer";
			setupPlayers(selectedGameMode);
		}

		if (multiPlayerButton) {
			selectedGameMode = "multiplayer";
			setupPlayers(selectedGameMode);
		}

		if (selectedGameMode !== null) {
            showShipPlacement(activePlayer,
			    activePlayer === playerOne
                    ? playerOneBoardElement
                    : playerTwoBoardElement,
		    );
            setupShipPlacement(activePlayer === playerOne
                ? playerOneBoardElement
                : playerTwoBoardElement
            );
        }
	};

	const initGame = () => {
		const modeSelectorElement = document.querySelector(".mode-select");
		modeSelectorElement.addEventListener("click", handleModeSelection);
	};

	const toggleOrientation = () => {
		orientation = orientation === "vertical" ? "horizontal" : "vertical";
	};

	const setupShipPlacement = (boardElement) => {
		const orientationButton = document.querySelector(".controls__btn--orientation");
		orientationButton.addEventListener("click", () => {
			toggleOrientation();
			orientationButton.textContent = `Change orientation: ${orientation}`;
		});

		const shipButtons = document.querySelectorAll(".controls__btn--ship");

		shipButtons.forEach((shipButton) => {
            shipButton.addEventListener("click", () => {
				shipButtons.forEach((btn) => btn.classList.remove("selected"));
				
                selectedShip = Number(shipButton.dataset.size);
				shipButton.classList.add("selected");
			});
		});

		boardElement.addEventListener("click", (event) => {
			const cell = event.target.closest(".board__cell");
			if (!cell || !selectedShip) return;

			let cellCoords = cell.dataset.value.split(",").map(Number);
			const row = cellCoords[0];
			const col = cellCoords[1];

            let shipCoordinates = [];
            for (let i = 0; i < selectedShip; i++) {
                if (orientation === "horizontal") {
                    shipCoordinates.push([row, col + i]);
                } else {
                    shipCoordinates.push([row + i, col]);
                }
            }

            const newShip = Ship(selectedShip);
            activePlayer.board.placeShip(newShip, shipCoordinates);
            updateBoard(activePlayer.board, boardElement);

            shipCoordinates.forEach(([r, c]) => {
                const cell = boardElement.querySelector(`.board__cell[data-value="${r},${c}"]`);
                if (cell) {
                    cell.classList.add("board__cell--disabled");
                }
            });
		});
	};

	return {
		initGame,
		setupShipPlacement,
	};
};
