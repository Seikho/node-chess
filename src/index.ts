import Engine = require("./engine/engine");
import classicEngine = require("./engine/instances/classic");
import classicPieces = require("./engine/pieces/pieces");
import enums = require("./enums");
import Directions = enums.Direction;
export = chess;

var chess = {
	Engine: Engine,
	classic: {
		engine: classicEngine,
		pieces: classicPieces,
	},
	Direction: enums.Direction
};
