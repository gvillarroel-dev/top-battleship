const modeSelect = document.querySelector(".mode-select");
const shipPlacement = document.querySelector(".ship-placement");
const modal = document.querySelector(".modal");
const game = document.querySelector(".game");
const passDevice = document.querySelector(".pass-device");
const boardP1 = document.querySelector(".game__board-p1");
const boardP2 = document.querySelector(".game__board-p2");

const toggleVisibility = (element, visible) => {
	element.hidden = !visible;
	element.setAttribute("aria-hidden", String(!visible));
};

const resetBoard = (board) => {
	board.innerHTML = "";
};

export const initDisplay = () => {
	resetBoard(boardP1);
	resetBoard(boardP2);
	toggleVisibility(modal, false);
	toggleVisibility(game, false);
	toggleVisibility(shipPlacement, false);
	toggleVisibility(modeSelect, true);
};

export const renderBoard = (board, container) => {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board.length; j++) {
			const div = document.createElement("div");
			div.classList.add("board__cell");
			div.setAttribute("data-value", [i, j]);

			container.appendChild(div);
		}
	}
};

export const showShipPlacement = (player, container) => {
	toggleVisibility(shipPlacement, true);
	toggleVisibility(game, true);
	toggleVisibility(modeSelect, false);

	renderBoard(player.board, container);
};

export const showGame = (player1, player2) => {
	toggleVisibility(modeSelect, false);
	toggleVisibility(shipPlacement, false);
	toggleVisibility(game, true);

	renderBoard(player1.board, boardP1);
	renderBoard(player2.board, boardP2);
};

export const showPassDevice = (player) => {
	toggleVisibility(game, false);
	toggleVisibility(passDevice, true);

	const passDeviceText = passDevice.querySelector(".pass-device__text");
	passDeviceText.textContent = `Pass the device to ${player.name}`;
};

export const showModal = (winner) => {
	toggleVisibility(modal, true);

	const modalText = modal.querySelector(".modal__winner");
	modalText.textContent = `${winner} won`;
};

export const updateBoard = (boardState, boardElement) => {
	const cells = boardElement.querySelectorAll(".board__cell");

	cells.forEach((cellElement) => {
		let position = cellElement.dataset.value.split(",");

		let row = Number(position[0]);
		let col = Number(position[1]);

		let isAttacked = boardState.attacks.some(
			([attackRow, attackCol]) => attackRow === row && attackCol === col,
		);

		const cellValue = boardState.board[row][col];

		if (isAttacked && cellValue !== null) {
			cellElement.classList.add("board__cell--ship-hit");
		} else if (cellValue !== null && cellValue !== "miss") {
			cellElement.classList.add("board__cell--ship");
		} else if (cellValue === "miss") {
			cellElement.classList.add("board__cell--miss");
		} else {
			cellElement.classList.add("board__cell--empty");
		}
	});
};
