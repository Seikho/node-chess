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
			notation: "b"
		}
		super(piece);
	}
}
var d = Chess.Direction;
var diag = helper.createMove([{direction: d.Diagonal, count: 0}], true, false, true);