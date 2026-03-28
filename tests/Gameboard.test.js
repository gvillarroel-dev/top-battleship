import { Gameboard } from "../src/Gameboard";
import { Ship } from "../src/Ship";

describe("Gameboard", () => {
	test("board initializes as 10x10 grid", () => {
		const gameboard = Gameboard();
		expect(gameboard.board).toEqual([
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
		]);
	});

	test("placeShip() it throws an error if you try to place a ship in an occupied position.", () => {
		const gameboard = Gameboard();
		const ship = Ship(3);
		gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
        const ship2 = Ship(3);

		expect(() => gameboard.placeShip(ship2, [[0, 0], [0, 1], [0, 2]])).toThrow();
	});

	test("receiveAttack() determines whether it hit a ship", () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.placeShip(ship, [[0,0], [0,1], [0,2]]);
        gameboard.receiveAttack(0, 0);
        expect(ship.hits).toBe(1);
    });

    test("receiveAttack() determines whether it misses a hit", () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
        gameboard.receiveAttack(1, 0);
        expect(gameboard.misses).toEqual([[1, 0]]);
    });

    test("allSunk() returns true if all ships were sunk", () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(0, 1);
        gameboard.receiveAttack(0, 2);
        expect(gameboard.allSunk()).toBe(true);
    });

    test("allSunk() returns false if not all ships were sunk", () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(1, 0);
        gameboard.receiveAttack(2, 0);
        expect(gameboard.allSunk()).toBe(false);
    });

    test("allSunk() returns false if there is at least one ship that is not sunk", () => {
        const gameboard = Gameboard();
        const ship1 = Ship(3);
        const ship2 = Ship(5);
        gameboard.placeShip(ship1, [[0, 0], [0, 1], [0, 2]]);
        gameboard.placeShip(ship2, [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]]);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(0, 1);
        gameboard.receiveAttack(0, 2);
        expect(gameboard.allSunk()).toBe(false);
    });
});
