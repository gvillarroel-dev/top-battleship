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

	const updateOrientationButton = (button) => {
		button.textContent = `Change orientation: ${orientation}`;
	};

	const handleShipSelection = (shipButtons, shipButton) => {
        shipButtons.forEach((btn) => btn.classList.remove("selected"));
        
        selectedShip = Number(shipButton.dataset.size);
        shipButton.classList.add("selected");
	};

    const calculateShipCoordinates = (row, col, size, orientation) => {
        const shipCoordinates = [];
        for (let i = 0; i < size; i++) {
            if (orientation === "horizontal") {
                shipCoordinates.push([row, col + i]);
            } else {
                shipCoordinates.push([row + i, col]);
            }
        }
        return shipCoordinates;
    }

    const placeShipOnBoard = (player, ship, coordinates) => {
        player.board.placeShip(ship, coordinates);
    }

    const disableBoardCells = (boardElement, coordinates) => {
        coordinates.forEach(([row, col]) => {
            const cell = boardElement.querySelector(`.board__cell[data-value="${row},${col}"]`);
            if (cell) {
                cell.classList.add("board__cell--disabled");
            }
        })
    }

	const setupShipPlacement = (boardElement) => {
		const orientationButton = document.querySelector(".controls__btn--orientation");
		orientationButton.addEventListener("click", () => {
			toggleOrientation();
			updateOrientationButton(orientationButton);
		});

		const shipButtons = document.querySelectorAll(".controls__btn--ship");
        shipButtons.forEach((shipButton) => {
            shipButton.addEventListener("click", () => {
                handleShipSelection(shipButtons, shipButton);
            });
        });

		boardElement.addEventListener("click", (event) => {
			const cell = event.target.closest(".board__cell");
			if (!cell || !selectedShip) return;

			const [row, col] = cell.dataset.value.split(",").map(Number);
			let shipCoordinates = calculateShipCoordinates(row, col, selectedShip, orientation);

			const newShip = Ship(selectedShip);
			placeShipOnBoard(activePlayer, newShip, shipCoordinates);
			updateBoard(activePlayer.board, boardElement);

			disableBoardCells(boardElement, shipCoordinates);
		});
	};

	return {
		initGame,
		setupShipPlacement,
	};
};
