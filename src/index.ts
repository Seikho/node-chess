import Engine = require("./engine/engine");
import classicEngine = require("./engine/instances/classic/engine");
import classicPieces = require("./engine/instances/classic/pieces/pieces");
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
