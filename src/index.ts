/// <reference path="typings/internal.d.ts" />
export class Board {

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


