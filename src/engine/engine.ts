import toString = require("./helpers/toString");
import getMoves = require("./helpers/getMoves");
import fenParser = require("./parsers/fen")
import createSqaures = require("./helpers/createSquares");
export = Engine;

/**
 * Board: extensible board (TODO: more detail)
 */
class Engine implements Chess.Engine {
	constructor(ranks?: number, files?: number) {
		ranks = ranks || 8;
		files = files || 8;
		if (isNaN(ranks) || isNaN(files)) throw "InvalidArgumentException: 'ranks' and 'files' must be a number";

		// Only accept positive, whole, organic, gluten-free numbers.
		this.rankCount = Math.floor(Math.abs(ranks));
		this.fileCount = Math.floor(Math.abs(files));
	}
	rankCount: number;
	fileCount: number;
	ranks: Chess.Rank[] = [];
	pieces: Chess.PieceFactory[] = [];
	positionParser = fenParser;
	capturedPieces: Chess.Piece[];
	toString = toString;
	create = createSqaures;

	/**
	 * Returns an array of the available squares a piece can move to
	 */
	availableMoves = getMoves;

	getSquare(square: Chess.Coordinate): Chess.Square {
		if (!this.ranks[square.rank]) return null;
		return this.ranks[square.rank].squares[square.file] || null;
	}

	populateAvailableMoves(): void {
		this.ranks.forEach(rank => {
			rank.squares.forEach(square => {
				square.availableMoves = this.availableMoves({ file: square.file, rank: rank.rank });
			});
		});
	}
	
	movePiece(move: Chess.Move) {
		var origin = this.getSquare(move.from);
		if (!origin || !origin.piece) return false;
		
		// The 'destination' square must be in the square's list of available moves
		if (!origin.availableMoves.some(move => move.file === move.file && move.rank === move.rank)) return false;
		var destination = this.getSquare(move.to); 
		if (destination.piece) this.capturedPieces.push(destination.piece)

		this.ranks[move.to.rank].squares[move.to.file] = {
			availableMoves: [],
			piece: origin.piece,
			file: move.to.file
		} 
		
		this.ranks[move.from.rank].squares[move.from.file] = {
			availableMoves: [],
			piece: null,
			file: move.from.file
		} 

		this.populateAvailableMoves();
		return true;
	}
}
