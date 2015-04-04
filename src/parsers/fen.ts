import Chess = require("../types");
import Board = require("../board");
import fenStringParser = require("./stringParsers/fen");

export = FenParser;

class FenParser implements Chess.PositionParser {
	constructor(parentBoard: Board) {
		this.parentBoard = parentBoard;
	}

	parentBoard: Board;
	boardInput: Chess.BoardInput;
	parse(position: string): void {
		//TODO Implement fen string parser, return a board
		// Only accept 8x8 board?

		// This will split a FEN string into an array. First 8 indexes are ranks of the board, descending from rank 8 t rank 1.
		this.boardInput = fenStringParser.parse(position);
		
		// Fen strings start from the 8th rank, so we start from 8 and descend to rank 1.
		var rankCount = this.parentBoard.rankCount;
		this.boardInput.ranks.forEach(rank => {
			this.parentBoard.ranks[rankCount] = this.createFilesForRank(rank, rankCount);
			rankCount--;	
		});
	}

	createFilesForRank(fenRank: string, rankNumber: number): Chess.Rank {
		var rank: Chess.Rank = {
			rank: rankNumber,
			squares: []
		}
		for (var i = 1; i <= this.parentBoard.fileCount; i++) {
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
			square.piece.originalPosition = { rank: rank.rank, file: i };
			rank.squares[i] = square;
		}
		return rank;
	}

	getPiece(notation: string): Chess.Piece {
		var pieceFactory = this.parentBoard.pieces.filter(p => p.notation.toUpperCase() === notation || p.notation.toLowerCase() === notation);
		return pieceFactory.length === 0
		? null
		// If the upperCase pieceFactory notation === notation, the piece is white.
		: pieceFactory[0].create(pieceFactory[0].notation.toUpperCase() === notation);
	}
}