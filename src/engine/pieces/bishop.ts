import BaseFactory = require("../baseFactory");
import helper = require("./helper");
import types = require("../../types");

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
var d = types.Direction;
var diag = helper.createMove([{direction: d.Diagonal, count: 0}], true, false, true);
