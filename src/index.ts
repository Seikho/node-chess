import Engine = require("./engine/engine");
import classicEngine = require("./engine/instances/newClassic/engine");
import enums = require("./enums");
import Directions = enums.Direction;
export = chess;

var chess = {
	Engine: Engine,
	classic: {
		engine: classicEngine,
	},
	Direction: enums.Direction
};
