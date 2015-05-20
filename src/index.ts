import Engine = require("./engine/engine");
import classicEngine = require("./engine/instances/classic");
import classicPieces = require("./engine/pieces/pieces");
import Direction = require("./engine/direction");
export = {
	Engine: Engine,
	classicEngine: classicEngine,
	classicPieces: classicPieces,
	Direction: Direction
}
