import Chess = require("../src/types");
import Board = require("../src/board");
import Fen = require("../src/parsers/fen");
import pieces = require("../src/pieces/pieces");
import chai = require("chai");
var expect = chai.expect;

// Starting position represented as a FEN string
var start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe("fen parsing tests", () => {
	// Build a basic board with a pawn a valid piece
	var board = new Board();

	// Add all classical pieces to the board
	for (var p in pieces) board.pieces.push(new pieces[p]());

	// Use FEN parser to properly instantiate the board state
	var fen = new Fen(board);

	// Fingers crossed!
	fen.parse(start);

	it("will have a pawn at 7,2", () => {
		var rankEight = board.ranks[7];
		var fileOne = rankEight.squares[2];
		expect(fileOne.piece).to.exist;
	});
});

var rank = [];
{
	var vals = [];
 	rank.forEach(function(el) { 
	if (isNaN(el)) vals.push(el);
	else {
		var arr = [];
		for(var i = 1;i <= el;i++) arr.push(1);
	 	vals.concat(arr);
		}
 	});
 	return vals;
}
/**
Start
= r:RankList WS t:Turn WS Castling WS Enpassant WS HalfMove WS Tuple
{ return { 
ranks: r,
turn: t
};
}
RankList
= head:Rank "/" tail:RankList { return [].concat(head,tail); }
/ Rank

Rank
= rank:[a-zA-Z0-9]+ {
	var vals = [];
 	rank.forEach(function(el) { 
	if (isNaN(el)) vals.push(el);
	else {
		var arr = [];
		for(var i = 1;i <= parseInt(el);i++) arr.push('1');
	 	vals.concat(arr);
		}
 	});
 	return [vals];
}

WS
= " " { return null; }

Turn
= turn:[w|b] { return turn }

Castling
= [k|q|K|Q|"-"]+

Enpassant
= [a-h1-8]{1}
/ "-"

HalfMove
= [0-9]+

Tuple
= [0-9]+
**/