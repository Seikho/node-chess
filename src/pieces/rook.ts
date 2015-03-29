import Chess = require("../types");
export = RookFactory; 

class RookFactory extends Chess.PieceFactory {
	constructor() {
		var rook = {
			name: "Rook",
			movement: [lat],
			canQueen: false,
			canSpawn: true,
			value: 5,
		};
		super(rook, "r");
	}
}

var lat = {
	moves: [{direction: Chess.Direction.Lateral, count: 0}],
	canJump: false,
	canCapture: true,
	canMove: true
}