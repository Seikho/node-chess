import Direction = require("../../direction");
import helper = require("./helper");
import BasePiece = require("../basePiece");
export = QueenPiece;

class QueenPiece extends BasePiece {
	name = "Queen";
	movement = [diag, lat];
	canQueen = false;
	canSpawn = true;
	value = 9;
	notation = "q";
}

var diag = helper.createMove([{ direction: Direction.Diagonal, count: 0 }], true, false, true);
var lat = helper.createMove([{ direction: Direction.Lateral, count: 0 }], true, false, true);
