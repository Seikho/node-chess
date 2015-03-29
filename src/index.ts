import Board = require("./board");
import Chess = require("./types");
import pieces = require("./pieces/pieces");
import Fen = require("./parsers/fen");
export = boards;

var boards = {
	classicBoard: new Board()
};

for (var p in pieces) boards.classicBoard.pieces.push(new pieces[p]());
var start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var fen = new Fen(boards.classicBoard);
fen.parse(start);
console.log(fen.board.toString());
