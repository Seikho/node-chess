import Chess = require("../types");
import helper = require("./helper");

export = BishopFactory;

class BishopFactory extends Chess.PieceFactory {
	constructor() {
		var pawn = {
			name: "Bishop",
			movement: [upLeft, upRight],
			canQueen: true,
			canSpawn: false,
			value: 1,
		}
		super(pawn, "b");
	}
}
var d = Chess.Direction;
var upLeft = helper.createMove([{direction: d.DiagonalUp, count: 0}], true, false, true);
var upRight = helper.createMove([{direction: d.DiagonalDown, count: 0}], true, false, true);