import Chess = require("node-chess");
import Engine = require("../../engine");
import pieces = require("./pieces/pieces");
import rules = require("./rules");
export = classEngine;

function classEngine(): Chess.Engine {
	var board = new Engine();

	Object.keys(pieces)
		.forEach(p => board.pieces.push(pieces[p]));

	board.positionParser();

	board.postMoveFunctions = [
		rules.postMove,	
	];
	
	return board;
}
