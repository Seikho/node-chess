/// <reference path="typings/internal.d.ts" />
export class Board {

}

export class Piece {
	constructor(){}

	notation: string;
	movement: PieceMovement[];

}

export interface PieceMovement {
	
}

export class Analyzer {
	constructor(board: Board, options?: AnalysisOptions) {
		this.evaluation = 0;
	}

	calculate(callback: (evaluation: number) => any): void {
		//TODO 
		callback(this.evaluation);
	}

	evaluation: number;
	options: AnalysisOptions;
}
