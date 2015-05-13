import Direction = require("../../direction");
export = pawn;

var firstMovePattern = {
	moves: [{ direction: Direction.Up, count: 2 }],
	canJump: false,
	canCapture: false,
	canMove: true
}

var firstMove: Chess.ConditionalMovement = {
	action: (piece: Chess.Piece) => {
		if (piece.moveHistory.length === 0) return firstMovePattern;
		return null;
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

var pawn: Chess.Piece = {
	location: null,
	name: "Pawn",
	movement: [moveForward, moveCapture],
	canQueen: true,
	canSpawn: false,
	value: 1,
	conditionalMoves: [firstMove],
	notation: "p"
}

