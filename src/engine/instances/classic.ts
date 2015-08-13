import Engine = require("../engine");
import pieces = require("../pieces/pieces");
import rules = require("./rules");
export = classEngine;

function classEngine() {
	var board = new Engine();

	Object.keys(pieces)
		.forEach(p => board.pieces.push(pieces[p]));

	board.positionParser();
	board.boardState.postMoveFunctions = [
		rules.allowedMoves.bind(board),
		rules.checkmatePostMove.bind(board),
		rules.stalematePostMove.bind(board)	
	];
	return board;
}
