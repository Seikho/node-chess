import fenStringParser = require("./stringParsers/fen");
export = fenParser;

var defaultPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function fenParser(position?: string): void {
	var engineInput = fenStringParser.parse(position || defaultPosition);
	var rankCount = this.rankCount;
	engineInput.ranks.forEach(rank => {
		this.ranks[rankCount] = createFilesForRank(this, rank, rankCount);
		rankCount--;
	});
}

function createFilesForRank(engine: Chess.Engine, fenRank: string, rankNumber: number): Chess.Rank {
	var rank: Chess.Rank = {
		rank: rankNumber,
		squares: []
	}
	for (var i = 1; i <= engine.fileCount; i++) {
		var notation = fenRank[i - 1];
		var notationNumber = parseInt(notation);

		// If the notation is a number, that many squares from this square contain no piece.
		// TODO Consider refactoring--export to function for readability
		if (!isNaN(notationNumber)) {

			// Insert the next notation after the blank squares.
			if (!!fenRank[i + 1]) fenRank[i + notationNumber] = fenRank[i + 1];

			// Insert blank squares from the current square, to currentSquare+notationNumber.
			for (var j = i; j < i + notationNumber; j++) {
				rank.squares[j] = { file: j, piece: null };
			}
			i += notationNumber - 1;
			continue;
		}
		var square = {
			file: i,
			piece: getPiece(engine, notation)
		}

		rank.squares[i] = square;
	}
	return rank;
}

function getPiece(engine: Chess.Engine, notation: string): Chess.Piece {
	var pieceCtors = engine.pieces.filter(p => p.prototype.notation.toUpperCase() === notation || p.prototype.notation.toLowerCase() === notation);
	if (pieceCtors.length === 0) return null;
	var ctor = pieceCtors[0];
	var ctorNotation = <string>ctor.prototype.notation;
	return new ctor(ctorNotation.toUpperCase() === notation);
}
