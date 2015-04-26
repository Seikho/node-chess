import Direction = require("../../direction");
import BaseFactory = require("../baseFactory");
export = PawnFactory;
/**
 * Pawn piece registration
 */

class PawnFactory extends BaseFactory {
	constructor() {
		var piece = {
			name: "Pawn",
			movement: [moveForward, moveCapture],
			canQueen: true,
			canSpawn: false,
			value: 1,
			notation: "p",
			moveHistory: []
		}
		super(piece);
	}
}

var moveForward = {
	moves: [{ direction: Direction.Up, count: 1 }],
	canJump: false,
	canCapture: false,
	canMove: true
}

var moveCapture = {
	moves: [{ direction: Direction.DiagonalUp, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false
}

var forward: Chess.SingleMove = {
	direction: Direction.Up,
	count: 1
}
