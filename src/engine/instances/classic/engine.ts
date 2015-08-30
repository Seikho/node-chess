import Chess = require("node-chess");
import Engine = require("../../engine");
import pawn = require("./pawn");
import knight = require("./knight");
import bishop = require("./bishop");
import rook = require("./rook");
import queen = require("./queen");
import king = require("./king");
import mates = require("./rules");

export = classEngine;

function classEngine(): Chess.Engine {
	var board = new Engine();
	
	board.pieces = [
		pawn, knight, bishop, rook, queen, king
	];

	board.positionParser();
	
	board.postMoveFunctions = [mates.postMove];
	
	return board;
}
