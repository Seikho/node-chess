import Direction = require("../../direction");
import helper = require("./helper");
import BasePiece = require("../basePiece");
export = KingPiece;

class KingPiece extends BasePiece {
	name = "King";
	movement = [diag, lat];
	canQueen = false;
	canSpawn = false;
	value = 10;
	notation = "k";
}
KingPiece.prototype.notation = "k";

var diag = helper.createMove([{ direction: Direction.Diagonal, count: 1 }], true, false, true);
var lat = helper.createMove([{ direction: Direction.Lateral, count: 1 }], true, false, true);