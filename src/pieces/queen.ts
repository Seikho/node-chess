import Chess = require("../types");
import helper = require("./helper");

export = QueenFactory;

class QueenFactory extends Chess.PieceFactory {
	constructor() {
		var pawn = {
			name: "Queen",
			movement: [diag, lat],
			canQueen: false,
			canSpawn: true,
			value: 9,
		}
		super(pawn, "q");
	}
}
var d = Chess.Direction;
var diag = helper.createMove([{direction: d.Diagonal, count: 0}], true, false, true);
var lat = helper.createMove([{direction: d.Lateral, count: 0}], true, false, true);