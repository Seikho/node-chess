import Board = require("./index");
import Chess = require("./types");
export = Analyzer;

class Analyzer {
	constructor(board: Board, options?: Chess.AnalysisOptions) {
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
	options: Chess.AnalysisOptions = {};
	startTime: number;
}

