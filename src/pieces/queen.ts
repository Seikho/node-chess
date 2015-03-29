import Chess = require("../types");
import helper = require("./helper");

export = QueenFactory;

class QueenFactory extends Chess.PieceFactory {
	constructor() {
		var pawn = {
			name: "Queen",
			movement: [upLeft, upRight],
			canQueen: false,
			canSpawn: true,
			value: 9,
		}
		super(pawn, "q");
	}
}
var d = Chess.Direction;
var upLeft = helper.createMove([{direction: d.DiagonalUp, count: 0}], true, false, true);
var upRight = helper.createMove([{direction: d.DiagonalDown, count: 0}], true, false, true);
var up = helper.createMove([{direction: d.Up, count: 0}], true, false, true);
var down = helper.createMove([{direction: d.Down, count: 0}], true, false, true);
var left = helper.createMove([{direction: d.Left, count: 0}], true, false, true);
var right = helper.createMove([{direction: d.Right, count: 0}], true, false, true);