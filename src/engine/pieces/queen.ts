import enums = require("../../enums");
import Direction = enums.Direction;
export = queen;

var diag = {
	moves: [{ direction: Direction.Diagonal, count: 0 }],
	canJump: false,
	canMove: true,
	canCapture: true
}

var lat = {
	moves: [{ direction: Direction.Lateral, count: 0 }],
	canJump: false,
	canCapture: true,
	canMove: true
}

var queen = {
	name: "Queen",
	movement: [diag, lat],
	canQueen: false,
	canSpawn: true,
	value: 9,
	notation: "q"
}

