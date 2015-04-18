import Chess = require("../types");
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
		this.positionParser = fenParser;
		this.rankCount = Math.floor(Math.abs(ranks));
		this.fileCount = Math.floor(Math.abs(files));
		this.toString = toString;
	}
	rankCount: number;
	fileCount: number;
	ranks: Chess.Rank[] = [];
	pieces: Chess.PieceFactory[] = [];
	positionParser: Chess.PositionParser;
	capturedPieces: Chess.Piece[];

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
		var x = square.rank;
		var y = square.file;
		if (!this.ranks[x]) return null;
		return this.ranks[x].squares[y] || null;
	}

  toString: () => string;
}
