import Direction = require("../../direction");
export = knight;

var horzThenVert = {
	moves: [{direction: Direction.Horizontal, count: 2}, {direction: Direction.Vertical, count: 1}],
	canJump: true,
	canCapture: true,
	canMove: true
}

var vertThenHorz = {
	moves: [{direction: Direction.Vertical, count: 2}, {direction: Direction.Horizontal, count: 1}],
	canJump: true,
	canCapture: true,
	canMove: true
} 

var knight = {
	name: "Knight",
	movement: [horzThenVert, vertThenHorz],
	canQueen: false,
	canSpawn: true,
	value: 3,
	notation: "n"
}