import Engine = require("../engine");
import pieces = require("../pieces/pieces");
export = classEngine;

function classEngine() {
	var board = new Engine();

	Object.keys(pieces)
		.forEach(p => board.pieces.push(pieces[p]));

	board.positionParser();
	board.ranks.length;
	return board;
}
