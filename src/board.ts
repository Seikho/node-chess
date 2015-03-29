/// <reference path="typings/internal.d.ts" />
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
	 * TODO Export function to smaller module
	 */
	availableMoves(coordinate: Chess.Coordinate): Chess.Coordinate[] {
		var moves = [];
		var square = this.getSquare(coordinate);
		if (!square) return moves;
		if (!square.piece) return moves;
		// piece.moves = MovePattern[]
		// MovePattern = SingleMove[], canJump, canCapture, canMove
		// SingleMove = direction, count
		// Assumption: Maximum of 2 SingleMoves in any MovePattern.
		for (var m in square.piece.movement) {
			var movePattern = square.piece.movement[m];

			var increments = [];
			for (var s in movePattern.moves) {
				increments.push({
					incs: helper.getIncrementer(movePattern.moves[s].direction),
					count: movePattern.moves[s].count
				});
			}

			if (increments.length === 0) return [];
			if (increments[0].length === 0) return [];

			for (var i = 0;i < increments[0].incs.length; i++) {
				var inc = increments[0].incs[i];
				if (inc.count > 0) {

				}
			}
		}
	}
	/**
	 * @return boolean Returns true if the piece moved to the toSquare
	 */ 
	movePieceTo(fromSquare: Chess.Coordinate, toSquare: Chess.Coordinate): boolean {
		return false;
	}

	applySingleMoves(moves: Array<Chess.SingleMove[]>, coordinate: Chess.Coordinate): Chess.Coordinate[] {
		for (var s in moves[0]) {
			var move = moves[0][s];
			var incs = helper.getIncrementer(move.direction);
			for (var i in incs) {
				var inc = incs[i];

				if (moves.length === 1) {

				}
			}
		}
		return [];
	}

	applyIncrementer(coordinate: Chess.Coordinate, incrementer: Chess.Coordinate, count: number, piece: Chess.Piece): Chess.Coordinate[] {
		var bounds = { rank: this.rankCount, file: this.fileCount };
		var coords: Chess.Coordinate[] = [];
		if (count > 0) {
			incrementer.file *= count;
			incrementer.rank *= count;
			coords.push(helper.applyIncrements(coordinate, [incrementer], bounds));
		}
		else {
			var count = 1;
			// While the returned position is inside the bounds of the board...
			while (true) {
				var newInc = {file: incrementer.file * count, rank: incrementer.rank * count};
				var newCoord = helper.applyIncrements(coordinate, [newInc], bounds);
				if (!newCoord) return coords;
				coords.push(newCoord);
				count++;
			}
		}
		return coords;
	}

	getSquare(square: Chess.Coordinate): Chess.Square {
		var x = square.rank;
		var y = square.file;
		if (!this.ranks[x]) return null;
		return this.ranks[x].squares[y] || null;
	}

	rankCount: number;
	fileCount: number;
	ranks: Chess.Rank[] = [];
	pieces: Chess.PieceFactory[] = [];
	
    toString(): string {
        var ranks: string[] = [];
        for (var i in this.ranks) {
            var pieces = [];
            var rank = this.ranks[i];
            for (var p in rank.squares) {
                var s = rank.squares[p];
                var val = s.piece == null?"_":s.piece.name.slice(0,1);
                if (s.piece) val = s.piece.isWhite?val.toUpperCase():val.toLowerCase();
                pieces.push("_" + val + "_");
            }
            ranks.push(pieces.join("|"));
        }
        return ranks.join("\r\n");
    }

}
