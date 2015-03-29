import Chess = require("../types");
export = RookFactory; 

class RookFactory extends Chess.PieceFactory {
	constructor() {
		var rook = {
			name: "Rook",
			movement: [moveUp, moveDown, moveLeft, moveRight],
			canQueen: true,
			canSpawn: false,
			value: 5,
		};
		super(rook, "r");
	}
}

var moveUp = {
	moves: [{direction: Chess.Direction.Up, count: 0}],
	canJump: false,
	canCapture: true,
	canMove: true
}

var moveDown = {
	moves: [{direction: Chess.Direction.Down, count: 0}],
	canJump: false,
	canCapture: true,
	canMove: true
}

var moveLeft = {
	moves: [{direction: Chess.Direction.Left, count: 0}],
	canJump: false,
	canCapture: false,
	canMove: true
}

var moveRight = {
	moves: [{direction: Chess.Direction.Right, count: 0}],
	canJump: false,
	canCapture: false,
	canMove: true
}