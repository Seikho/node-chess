import Chess = require("node-chess");
import chess = require("../src/index");
import chai = require("chai");
var Analysis = require("analysis");
var box = Analysis.descriptive.box;
var expect = chai.expect;

describe("benchmarks", function() {
	this.timeout(60000);
	var engines: Chess.Engine[] = [];
	
	it("will create a classic board 500 times", () => {
		for (var x = 0; x < 500; x++) {
			engines.push(chess.classic.engine());
		}
	});

	it("will move a2-a3 500 times", () => {
		var times = engines.map(e => {
			var timer = new Timer();
			e.movePiece({ from: { file: 2, rank: 2 }, to: { file: 2, rank: 3 } });
			return timer.stop();
		});
		
		console.log(box(times));
	});
});

class Timer {
	startTime = Date.now();
	stop = () => Date.now() - this.startTime;
}