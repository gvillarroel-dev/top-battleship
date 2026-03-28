import { Ship } from "../src/Ship";

describe("Ship", () => {
	test("has the correct length", () => {
		const ship = Ship(3);
		expect(ship.length).toBe(3);
	});
	test("starts with 0 hits", () => {
		const ship = Ship(3);
		expect(ship.hits).toBe(0);
	});
	test("hit() increments hits", () => {
		const ship = Ship(3);
		ship.hit();
		expect(ship.hits).toBe(1);
	});
	test("isSunk() return false if not sunk", () => {
		const ship = Ship(3);
		ship.hit();
		expect(ship.isSunk()).toBe(false);
	});
	test("isSunk() returns true if sunk", () => {
		const ship = Ship(3);
		ship.hit();
		ship.hit();
		ship.hit();
		expect(ship.isSunk()).toBe(true);
	});
});
