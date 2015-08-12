import Engine = require("./engine/engine");
import classicEngine = require("./engine/instances/classic");
import classicPieces = require("./engine/pieces/pieces");
import enums = require("./enums");
import Directions = enums.Direction;
export = chess;

var chess: any = Engine;
chess.classic = {
	engine: classicEngine,
	pieces: classicPieces
}
chess.Direction = enums.Direction;
