import Direction = require("../../direction");
import helper = require("./helper");
import BaseFactory = require("../baseFactory");
export = KnightFactory;

class KnightFactory extends BaseFactory {
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
var horzThenVert = helper.createMove([{direction: Direction.Horizontal, count: 2}, {direction: Direction.Vertical, count: 1}], true, true, true);
var vertThenHorz = helper.createMove([{direction: Direction.Vertical, count: 2}, {direction: Direction.Horizontal, count: 1}], true, true, true);
