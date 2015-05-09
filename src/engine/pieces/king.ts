import Direction = require("../../direction");
export = king;

var diag = {
	moves: [{ direction: Direction.Diagonal, count: 1 }],
	canJump: false,
	canMove: true,
	canCapture: true
}

var lat = {
	moves: [{ direction: Direction.Lateral, count: 1 }],
	canJump: false,
	canMove: true,
	canCapture: true
}

var king = {
	name: "King",
	movement: [diag, lat],
	canQueen: false,
	canSpawn: false,
	value: 10,
	notation: "k"
}