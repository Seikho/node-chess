import Engine = require("./engine/engine");
import classicEngine = require("./engine/instances/classic/engine");
import enums = require("./enums");
import Directions = enums.Direction;

const chess = {
	Engine: Engine,
	classic: {
		engine: classicEngine,
	},
	Direction: enums.Direction
};

export = chess;
exports.default = chess; 
 
