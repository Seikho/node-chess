import Chess = require("../types");
import helper = require("./helper");

export = BishopFactory;

class BishopFactory extends Chess.PieceFactory {
	constructor() {
		var pawn = {
			name: "Bishop",
			movement: [diag],
			canQueen: false,
			canSpawn: true,
			value: 3,
		}
		super(pawn, "b");
	}
}
var d = Chess.Direction;
var diag = helper.createMove([{direction: d.Diagonal, count: 0}], true, false, true);