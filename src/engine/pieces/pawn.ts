import Chess = require("../../types");
export = PawnFactory;
/**
 * Pawn piece registration
 */

class PawnFactory extends Chess.PieceFactory {
	constructor() {
		var piece = {
			name: "Pawn",
			movement: [moveForward, moveCapture],
			canQueen: true,
			canSpawn: false,
			value: 1,
			notation: "p"
		}
		super(piece);
	}
}

var moveForward = {
	moves: [{ direction: Chess.Direction.Up, count: 1 }],
	canJump: false,
	canCapture: false,
	canMove: true
}

var moveCapture = {
	moves: [{ direction: Chess.Direction.DiagonalUp, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false
}

var forward: Chess.SingleMove = {
	direction: Chess.Direction.Up,
	count: 1
}
