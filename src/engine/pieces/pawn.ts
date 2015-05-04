import Direction = require("../../direction");
import BasePiece = require("../basePiece");
export = PawnPiece;

/**
 * Pawn piece registration
 */
class PawnPiece extends BasePiece {
	name = "Pawn";
	movement = [moveForward, moveCapture];
	canQueen = true;
	canSpawn = false;
	value = 1;
	conditionalMoves = [this.makeConditionalMove(() => this.moveHistory.length === 0, firstMovePattern)];
	notation = "p";
}
PawnPiece.prototype.notation = "p";

function firstMoveConditional() {
	if (this.moveHistory.length === 0) return firstMovePattern;
	else null;
}

var firstMovePattern = {
	moves: [{ direction: Direction.Up, count: 2 }],
	canJump: false,
	canCapture: false,
	canMove: true
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
