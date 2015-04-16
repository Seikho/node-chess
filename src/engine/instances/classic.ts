import Engine = require("../engine");
import pieces = require("../pieces/pieces");
export = classEngine;

function classEngine() {
	var board = new Engine();
	for (var p in pieces) board.pieces.push(new pieces[p]());

	board.positionParser();
	return board;
}
