import { Player } from "../src/Player.js";
import { Ship } from "../src/Ship.js";

describe("Player", () => {
	test("Start with a clean dashboard", () => {
		const player = Player();
		expect(player.board.board).toEqual(
			Array.from({ length: 10 }, () => Array(10).fill(null)),
		);
	});

	test("attack() produces an attack on the enemy board at a defined coordinate", () => {
		const player1 = Player();
		const player2 = Player();
		const ship = Ship(1);

		player2.board.placeShip(ship, [[0, 0]]);
		player1.attack(player2.board, 0, 0);

		expect(ship.hits).toBe(1);
	});

	test("attack() return the coordinates of miss an hit", () => {
		const player1 = Player();
		const player2 = Player();
		const ship = Ship(1);

		player2.board.placeShip(ship, [[0, 1]]);
		player1.attack(player2.board, 0, 0);
		expect(player2.board.misses).toEqual([[0, 0]]);
	});

	test("randomAttack() perform an attack on a valid coordinate and that it does not repeat coordinates already attacked", () => {
		const player1 = Player();
		const player2 = Player();

		player1.randomAttack(player2.board);
		const [row, col] = player2.board.misses[0];

		expect(row).toBeGreaterThanOrEqual(0);
		expect(row).toBeLessThanOrEqual(9);
		expect(col).toBeGreaterThanOrEqual(0);
		expect(col).toBeLessThanOrEqual(9);
	});

	test("randomAttack() throws an error when attempting to repeat an attack on an already attacked coordinate", () => {
		const player1 = Player();
		const player2 = Player();

		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				player2.board.receiveAttack(i, j);
			}
		}

		expect(() => player1.randomAttack(player2.board)).toThrow();
	});
});
