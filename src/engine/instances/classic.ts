import Engine = require("../engine");
import pieces = require("../pieces/pieces");
export = classEngine;

function classEngine() {
	var board = new Engine();
	for (var p in pieces) board.pieces.push(pieces[p]);

	board.positionParser();
	board.ranks.length;
	return board;
}
