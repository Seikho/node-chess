/// <reference path="typings/internal.d.ts" />

/**
 * Board: extensible board (TODO: more detail)
 */ 
export class Board {
	constructor(ranks?: number, files?: number) {
		if (isNaN(ranks) || isNaN(files)) throw "InvalidArgumentException: 'ranks' and 'files' must be a number";
		// Only accept positive, whole, organic, gluten-free numbers.
		this.rankCount = !!ranks?Math.floor(Math.abs(ranks)):8;
		this.fileCount = !!ranks?Math.floor(Math.abs(files)):8;
	}

	/**
	 * Creates an empty board using a 2-dimensional, non-zero based array.
	 */
	create(): void {
		this.ranks = [];
		for (var rank = 0; rank < this.rankCount;rank++) {
			var row: Rank = {
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
	availableMoves(coordinate: Coordinate): Coordinate[] {
		var moves = [];
		var square = this.getSquare(coordinate);
		if (!square) return moves;

	}

	getSquaresForMove(coordinate: Coordinate, movePattern: MovePattern, isWhite?: boolean): Coordinate[] {
		isWhite = isWhite || true;
		var coordinates: Coordinate[] = [];
		var moves = movePattern.moves;

		// Can only provide two (2) single moves. Providing more makes no logical sense
		// An error will get thrown to explicitly disallow this
		if (moves.length > 2) return coordinates;
		if (moves.length === 2) {
			if (moves[0].count === 0 && moves[1].count === 0) return coordinates;
			var incLeft = this.getIncrementer(moves[0].direction);
			var incRight = this.getIncrementer(moves[1].direction);
			if (!isWhite) {
				incLeft = this.inverseCoordinates(incLeft);
				incRight = this.inverseCoordinates(incRight);
			}
			/// Invalid move definition: Cannot have infinte moves in both directions -- This limit will be removed
			if (moves[0].count !== 0 && moves[1].count !== 0) {

			}	
		} 

		movePattern.forEach(singleMove => {

		});
	}

	getSquareForMoves(coordinate: Coordinate, movePatterns: MovePattern[]): Coordinate[] {
		var coordinates: Coordinate = [];
		movePatterns.forEach(move => coordinates.concat(getSquaresForMove(coordinate, move)));
		return coordinates;
	}

	inverseCoordinatse(coordinates: Coordinate[]): Coordinate[] {
		return coordinates.map(coord => { return { rank: coord.rank*=1, file: coord.file*=-1 } } );
	}


	/**
	 * @return boolean Returns true if the piece moved to the toSquare
	 */ 
	movePieceTo(fromSquare: Coordinate, toSquare: Coordinate): boolean {
		return false;
	}

	getSquare(square: Coordinate): Square {
		var x = square.rank;
		var y = square.file;
		if (!this.ranks[x]) return null;
		return this.ranks[x].squares[y] || null;
	}

	getIncrementer(direction: Chess.Direction): Location[] {
		switch (direction) {
			case Chess.Direction.Up:
				return [{ rank: 1, file: 0}];
			case Chess.Direction.Down:
			   return [{ rank: -1, file: 0}];
			case Chess.Direction.Left:
			   return [{rank: 0, file: -1}];
			case Chess.Direction.Right:
			   return [{rank: 0, file: 1}];
			case Chess.Direction.DiagonalUp:
			   return [{rank: 1, file: -1}, {rank: 1, file: 1}];
			case Chess.Direction.DiagonalDown:
			   return [{rank: -1, file: -1}, {rank: -1, file: 1}];
			default:
			   throw "InvalidDirectionException: The direction provided was invalid";
		}
	}

	rankCount: number;
	fileCount: number;
	ranks: Rank[];
}

export class Piece {
	constructor(){}

	notation: string;
	movement: PieceMovement[];

}

export class Analyzer {
	constructor(board: Board, options?: AnalysisOptions) {
		this.evaluation = 0;
		if (!options) options = {};
		this.options.interval = options.interval || 100;
		this.options.depth = options.depth || 5;
		this.options.time = options.time || 5;
		this.startTime = Date.now();
	}

	calculate(callback: (evaluation: number) => any): void {
		//TODO 
		callback(this.evaluation);
	}

	evaluation: number;
	options: AnalysisOptions = {};
	startTime: number;
}


