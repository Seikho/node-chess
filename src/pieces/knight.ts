import Chess = require("../types");
import helper = require("./helper");

export = KnightFactory;

class KnightFactory extends Chess.PieceFactory {
	constructor() {
		var piece = {
			name: "Knight",
			movement: [horzThenVert, vertThenHorz],
			canQueen: false,
			canSpawn: true,
			value: 3,
			notation: "n"
		}
		super(piece);
	}
}
var d = Chess.Direction;
var horzThenVert = helper.createMove([{direction: d.Horizontal, count: 2}, {direction: d.Vertical, count: 1}], true, true, true);
var vertThenHorz = helper.createMove([{direction: d.Vertical, count: 2}, {direction: d.Horizontal, count: 1}], true, true, true);
