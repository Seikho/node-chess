import Direction = require("../../direction");
import helper = require("./helper");
import BasePiece = require("../basePiece");
export = KnightPiece;

class KnightPiece extends BasePiece {
	name = "Knight";
	movement = [horzThenVert, vertThenHorz];
	canQueen = false;
	canSpawn = true;
	value = 3;
	notation = "n";
}
KnightPiece.prototype.notation = "n";

var horzThenVert = helper.createMove([{direction: Direction.Horizontal, count: 2}, {direction: Direction.Vertical, count: 1}], true, true, true);
var vertThenHorz = helper.createMove([{direction: Direction.Vertical, count: 2}, {direction: Direction.Horizontal, count: 1}], true, true, true);
