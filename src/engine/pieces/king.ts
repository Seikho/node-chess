import Direction = require("../../direction");
import helper = require("./helper");
import BaseFactory = require("../baseFactory");

export = KingFactory;

class KingFactory extends BaseFactory {
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
var diag = helper.createMove([{direction: Direction.Diagonal, count: 1}], true, false, true);
var lat = helper.createMove([{direction: Direction.Lateral, count: 1}], true, false, true);
