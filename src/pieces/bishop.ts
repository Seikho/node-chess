import Chess = require("../types");
import helper = require("./helper");

export = BishopFactory;

class BishopFactory extends Chess.PieceFactory {
	constructor() {
		var pawn = {
			name: "Bishop",
			movement: [diagUp, diagDown],
			canQueen: false,
			canSpawn: true,
			value: 3,
		}
		super(pawn, "b");
	}
}
var d = Chess.Direction;
var diagUp = helper.createMove([{direction: d.DiagonalUp, count: 0}], true, false, true);
var diagDown = helper.createMove([{direction: d.DiagonalDown, count: 0}], true, false, true);