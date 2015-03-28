import Board = require("./board");
import Chess = require("./types");
import Pawn = require("./pieces/pawn");
export = boards;

var boards = {
	classicBoard: new Board()
};

boards.classicBoard.pieces.push(Pawn);