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
