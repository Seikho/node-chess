import BasePiece = require("../basePiece");
import helper = require("./helper");
import Direction = require("../../direction");
export = BishopPiece;

class BishopPiece extends BasePiece {
	name = "Bishop";
	movement = [diag];
	canQueen = false;
	canSpawn = true;
	value = 3;
	notation = "b";
}
BishopPiece.prototype.notation = "b";

var diag = helper.createMove([{ direction: Direction.Diagonal, count: 0 }], true, false, true);
