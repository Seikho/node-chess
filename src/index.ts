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
	 */
	availableMoves(square: Coordinate): Coordinate[] {
		return [];
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


