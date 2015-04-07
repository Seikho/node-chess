import Chess = require("./types");
import helper = require("./helper");
export = Board;
/**
 * Board: extensible board (TODO: more detail)
 */ 
class Board {
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
	positionParser: Chess.PositionParser;

	/**
	 * Creates an empty board using a 2-dimensional, non-zero based array.
	 */
	create(): void {
		this.ranks = [];
		for (var rank = 0; rank < this.rankCount;rank++) {
			var row: Chess.Rank = {
				rank: rank, 
				squares: []
			};

			for (var file = 0; file < this.fileCount;file++) {
				row.squares[file+1] = {
					file: file,
					piece: null
				}
			}
			this.ranks[rank+1] = row;
		}
	}

	/**
	 * Returns an array of the available squares a piece can move to
	 */
	availableMoves(coordinate: Chess.Coordinate): Chess.Coordinate[] {
		var square = this.getSquare(coordinate);
		return helper.getSquaresForMoves(coordinate, square.piece);
	}
	
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

	isSquareOccupied(coordinate: Chess.Coordinate): boolean {
		return !!this.ranks[coordinate.rank].squares[coordinate.file];
	}

	isOpponentPiece(left: Chess.Piece, right: Chess.Piece) {
		return left.isWhite === right.isWhite;
	}
	
    toString(): string {
        var ranks: string[] = [];
        var fileLabels = ['-'];
        for (var i = this.rankCount;i > 0; i--) {
        	fileLabels[i] = "_" + i + "_";
            var pieces: any[] = [i];
            var rank = this.ranks[i];
            for (var p in rank.squares) {
                var s = rank.squares[p];
                var val = s.piece == null?"_":s.piece.notation;
                if (s.piece) val = s.piece.isWhite?val.toUpperCase():val.toLowerCase();
                pieces.push("_" + val + "_");
            }
            ranks.push(pieces.join("|"));
        }
        ranks.push(fileLabels.join("|"));
        return ranks.join("\r\n");
    }
}
