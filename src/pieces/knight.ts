import Chess = require("../types");
import helper = require("./helper");

export = KnightFactory;

class KnightFactory extends Chess.PieceFactory {
	constructor() {
		var pawn = {
			name: "Knight",
			movement: [upLeft, upRight, downLeft, downRight, leftUp, leftDown, rightUp, rightDown],
			canQueen: false,
			canSpawn: true,
			value: 3,
		}
		super(pawn, "n");
	}
}
var d = Chess.Direction;
var upLeft = helper.createMove([{direction: d.Up, count: 2}, {direction: d.Left, count: 1}], true, true, true);
var upRight = helper.createMove([{direction: d.Up, count: 2}, {direction: d.Right, count: 1}], true, true, true);
var downLeft = helper.createMove([{direction: d.Down, count: 2}, {direction: d.Left, count: 1}], true, true, true);
var downRight = helper.createMove([{direction: d.Down, count: 2}, {direction: d.Right, count: 1}], true, true, true);
var leftUp = helper.createMove([{direction: d.Left, count: 2}, {direction: d.Up, count: 1}], true, true, true);
var leftDown = helper.createMove([{direction: d.Left, count: 2}, {direction: d.Down, count: 1}], true, true, true);
var rightUp = helper.createMove([{direction: d.Right, count: 2}, {direction: d.Up, count: 1}], true, true, true);
var rightDown = helper.createMove([{direction: d.Right, count: 2}, {direction: d.Down, count: 1}], true, true, true);
