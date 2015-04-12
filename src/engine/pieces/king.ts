import Chess = require("../../types");
import helper = require("./helper");

export = KingFactory;

class KingFactory extends Chess.PieceFactory {
	constructor() {
		var piece = {
			name: "King",
			movement: [diag, lat],
			canQueen: false,
			canSpawn: false,
			value: 10,
			notation: "k"
		}
		super(piece);
	}
}
var d = Chess.Direction;
var diag = helper.createMove([{direction: d.Diagonal, count: 1}], true, false, true);
var lat = helper.createMove([{direction: d.Lateral, count: 1}], true, false, true);
