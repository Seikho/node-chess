import BaseFactory = require("../baseFactory");
import helper = require("./helper");
import Direction = require("../../direction");

export = BishopFactory;

class BishopFactory extends BaseFactory {
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
var diag = helper.createMove([{direction: Direction.Diagonal, count: 0}], true, false, true);
