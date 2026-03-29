const toggleVisibility = (element, visible) => {
	element.hidden = !visible;
	element.setAttribute("aria-hidden", String(!visible));
};

const resetBoard = (board) => {
	board.innerHTML = "";
};

export const initDisplay = () => {
	const modal = document.querySelector(".modal");
	const boards = document.querySelector(".game");
	const controls = document.querySelector(".ship-placement");
	const modeElement = document.querySelector(".mode-select");
	const boardP1 = document.querySelector(".game__board-p1");
	const boardP2 = document.querySelector(".game__board-p2");

	resetBoard(boardP1);
	resetBoard(boardP2);
	toggleVisibility(modal, false);
	toggleVisibility(boards, false);
	toggleVisibility(controls, false);
	toggleVisibility(modeElement, true);
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

export const showShipPlacement = (player) => {
	const controls = document.querySelector(".ship-placement");
	const game = document.querySelector(".game");
	const modeGame = document.querySelector(".mode-select");

	toggleVisibility(controls, true);
	toggleVisibility(game, true);
	toggleVisibility(modeGame, false);

	const board = document.querySelector(".game__board-p1");
	renderBoard(player.board, board);
};