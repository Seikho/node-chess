import Direction = require("../../direction");
import BaseFactory = require("../baseFactory");
export = RookFactory;

class RookFactory extends BaseFactory {
	constructor() {
		var piece = {
			name: "Rook",
			movement: [lat],
			canQueen: false,
			canSpawn: true,
			value: 5,
			notation: "r",
			moveHistory: []
		};
		super(piece);
	}
}

var lat = {
	moves: [{direction: Direction.Lateral, count: 0}],
	canJump: false,
	canCapture: true,
	canMove: true
}
