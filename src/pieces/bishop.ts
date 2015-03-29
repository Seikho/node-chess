import Chess = require("../types");
import helper = require("./helper");

export = BishopFactory;

class BishopFactory extends Chess.PieceFactory {
	constructor() {
		var piece = {
			name: "Bishop",
			movement: [diag],
			canQueen: false,
			canSpawn: true,
			value: 3,
		}
		super(piece, "b");
	}
}
var d = Chess.Direction;
var diag = helper.createMove([{direction: d.Diagonal, count: 0}], true, false, true);