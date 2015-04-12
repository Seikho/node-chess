import Engine = require("../engine");
import Fen = require("../parsers/fen");
import pieces = require("../pieces/pieces");
export = newClassicEngine;

function newClassicEngine() {
	var board = new Engine();
	for (var p in pieces) board.pieces.push(new pieces[p]());
	var start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
	board.positionParser = new Fen(board);
	board.positionParser.parse(start);
	return board;
}
