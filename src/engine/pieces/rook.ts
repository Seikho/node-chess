import types = require("../../types");
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
			notation: "r"
		};
		super(piece);
	}
}

var lat = {
	moves: [{direction: types.Direction.Lateral, count: 0}],
	canJump: false,
	canCapture: true,
	canMove: true
}
