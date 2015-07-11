import Engine = require("./engine/engine");
import classicEngine = require("./engine/instances/classic");
import classicPieces = require("./engine/pieces/pieces");
import enums = require("./enums");
import Directions = enums.Direction;

export var engine = Engine;

export var classic = {
	engine: classicEngine,
	pieces: classicPieces
};

export var Direction = Directions;
