import Board = require("./board");
import Chess = require("./types");
import Pawn = require("./pieces/pawn");
export = boards;

var boards: any = {};

var classicBoard = new Board();
classicBoard.pieces.push(new Pawn());

boards.classic = classicBoard;