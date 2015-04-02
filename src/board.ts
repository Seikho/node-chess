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

	rankCount: number;
	fileCount: number;
	ranks: Chess.Rank[] = [];
	pieces: Chess.PieceFactory[] = [];
	
    toString(): string {
        var ranks: string[] = [];
        for (var i = this.rankCount;i > 0; i--) {
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
        return ranks.join("\r\n");
    }

    applyMovePatterns(coordinate: Chess.Coordinate): Chess.Coordinate[] {
    	var square = this.ranks[coordinate.rank].squares[coordinate.file];
    	var bounds = { rank: this.rankCount, file: this.fileCount };
    	var coords: Chess.Coordinate[] = [];

    	if (!square.piece) return [];
    	for (var m in square.piece.movement) {
    		var movePattern = square.piece.movement[m];
    		for (var s in movePattern.moves) {
    			var singleMove = movePattern.moves[s];
    			if (singleMove.count > 0) {
    				var incrementers = helper.getIncrementer(singleMove.direction);
    				for (var i in incrementers) {
    					var incrementer = incrementer[i];
    					incrementer.file *= singleMove.count;
    					incrementer.rank *= singleMove.count;
    					var newCoord = helper.applyIncrements(coordinate,[incrementer], bounds);
    					if (!!newCoord) coords.push(newCoord);
    				}
    			}
    			var count = 1;
    			var addCoord: Chess.Coordinate = { file: 0, rank: 0 };
    			while (!!addCoord) {
    				var incrementers = helper.getIncrementer(singleMove.direction);
    				
    			}
    		}
    	}
    }
}
