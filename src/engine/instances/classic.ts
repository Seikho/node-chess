import Engine = require("../engine");
import pieces = require("../pieces/pieces");
import rules = require("./rules");
export = classEngine;

function classEngine() {
	var board = new Engine();

	Object.keys(pieces)
		.forEach(p => board.pieces.push(pieces[p]));

	board.positionParser();

	board.postMoveFunctions = [
		rules.checkmatePostMove,
		rules.stalematePostMove	
	];
	
	return board;
}
