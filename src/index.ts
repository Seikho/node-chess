import Board = require("./board");
import Chess = require("./types");
import pawn = require("./pieces/pawn");
export = boards;

var boards: any = {};

var classicBoard = new Board();
classicBoard.pieces.push(pawn);

boards.classic = classicBoard;