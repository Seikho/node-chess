import Direction = require("../../direction");
import helper = require("./helper");
import BaseFactory = require("../baseFactory");
export = QueenFactory;

class QueenFactory extends BaseFactory {
	constructor() {
		var piece = {
			name: "Queen",
			movement: [diag, lat],
			canQueen: false,
			canSpawn: true,
			value: 9,
			notation: "q"
		}
		super(piece);
	}
}
var diag = helper.createMove([{direction: Direction.Diagonal, count: 0}], true, false, true);
var lat = helper.createMove([{direction: Direction.Lateral, count: 0}], true, false, true);
