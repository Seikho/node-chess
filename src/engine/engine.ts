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

	/**
	 * @return boolean Returns true if the piece moved to the toSquare
	 */
	movePieceTo(fromSquare: Chess.Coordinate, toSquare: Chess.Coordinate): boolean {
		return false;
	}

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
}
