import { Gameboard } from "../src/Gameboard.js";

export const Player = () => {
	const gameboard = Gameboard();

	const attack = (boardEnemy, x, y) => {
		boardEnemy.receiveAttack(x, y);
	};

	const randomAttack = (boardEnemy) => {
		let x, y;
        if (boardEnemy.attacks.length >= 100) {
            throw new Error("Board is full")
        };

		do {
			x = Math.floor(Math.random() * 10);
			y = Math.floor(Math.random() * 10);
		} while (boardEnemy.attacks.some(([row, col]) => row === x && col === y));

		attack(boardEnemy, x, y);
	};

	return {
		board: gameboard,
		attack,
		randomAttack,
	};
};
