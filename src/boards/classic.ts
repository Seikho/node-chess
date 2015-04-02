import Board = require("../board");
import Fen = require("../parsers/fen");
import pieces = require("../pieces/pieces");
export = newClassicBoard;

function newClassicBoard() {
	var board = new Board();
	for (var p in pieces) board.pieces.push(new pieces[p]());
	var start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
	var fen = new Fen(board);
	fen.parse(start);
	return board;
}