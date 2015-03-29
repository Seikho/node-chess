/// <reference path="../typings/internal.d.ts" />
import Chess = require("../types");
import Board = require("../board");
export = FenParser;

class FenParser implements Chess.PositionParser {
	constructor(board: Board) {
		this.board = board;
	}

	board: Board;
	parse(position: string): any {
		//TODO Implement fen string parser, return a board
		// Only accept 8x8 board?

		// This will split a FEN string into an array. First 8 indexes are ranks of the board, descending from rank 8 t rank 1.
		var info = position.match(/[a-z|A-Z|0-9]*[^/\s]/g);
		for (var i = 1; i <= this.board.rankCount; i++) {		
			this.board.ranks[i] = this.createFilesForRank(info[i-1], i);
		}
	}

	createFilesForRank(fenRank: string, rankNumber: number): Chess.Rank {
		var rank: Chess.Rank = {
			rank: rankNumber,
			squares: []
		}
		for (var i = 1; i <= this.board.fileCount; i++) {
			var notation = fenRank[i-1];
			var notationNumber = parseInt(notation);

			// If the notation is a number, that many squares from this square contain no piece.
			// TODO Consider refactoring--export to function for readability
			if (!isNaN(notationNumber)) {

				// Insert the next notation after the blank squares. 
				if (!!fenRank[i+1]) fenRank[i+notationNumber] = fenRank[i+1];

				// Insert blank squares from the current square, to currentSquare+notationNumber.
				for (var j = i;j < i+notationNumber;j++) rank.squares.push({file: j, piece: null});
				i += notationNumber-1;
				continue;
			}
			var square = {
				file: i,
				piece: this.getPiece(notation)
			}
			rank.squares[i] = square;
		}
		return rank;
	}

	getPiece(notation: string): Chess.Piece {
		var pieceFactory = this.board.pieces.filter(p => p.notation === notation.toString().toLowerCase());
		return pieceFactory.length === 0
		? null
		: pieceFactory[0].create(pieceFactory[0].notation.toLowerCase() !== notation);
	}
}
