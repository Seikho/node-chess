import Direction = require("../../direction");
import BasePiece = require("../basePiece");
export = RookPiece;

class RookPiece extends BasePiece {
	name = "Rook";
	movement = [lat];
	canQueen = false;
	canSpawn = true;
	value = 5;
	notation = "r";
}

var lat = {
	moves: [{ direction: Direction.Lateral, count: 0 }],
	canJump: false,
	canCapture: true,
	canMove: true
}
