export const Gameboard = () => {
	const board = Array.from({ length: 10 }, () => Array(10).fill(null));
	const misses = [];
	const ships = [];
	const attacks = [];

	const isEmpty = (coordinates) => {
		for (let [row, col] of coordinates) {
			if (board[row][col] !== null) {
				throw new Error("Occupied position");
			}
		}
		return true;
	};

	const placeShip = (ship, coordinates) => {
		if (isEmpty(coordinates)) {
			for (const [row, col] of coordinates) {
				board[row][col] = ship;
				ships.push(ship);
			}
			return board;
		}
	};

	const receiveAttack = (row, col) => {
		const cell = board[row][col];
		if (cell !== null) {
			cell.hit();
			attacks.push([row, col]);
		} else {
			misses.push([row, col]);
		}
	};

	const allSunk = () => {
		return ships.every((ship) => ship.isSunk());
	};

	return {
		board,
		misses,
		attacks,
		placeShip,
		receiveAttack,
		allSunk,
		isEmpty,
	};
};
