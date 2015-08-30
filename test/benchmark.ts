import Chess = require("node-chess");
import chess = require("../src/index");
import Promise = require("bluebird");
import chai = require("chai");
var Analysis = require("analysis");
var box = Analysis.descriptive.box;
var expect = chai.expect;

describe("benchmarks", function() {
	this.timeout(60000);
	var engines: Chess.Engine[] = [];

	var times = 100;
	it(`will create a classic board ${times} times`, () => {
		for (var x = 0; x < times; x++) {
			engines.push(chess.classic.engine());
		}
	});

	it(`will move a2-a3 ${times} times`, () => {
		var times = engines.map(e => {
			var timer = new Timer();
			e.movePiece({ from: { file: 2, rank: 2 }, to: { file: 2, rank: 3 } });
			return timer.stop();
		});

		console.log(box(times));
	});

	it(`will move a7-a6 ${times} using movePieceAsync`, done => {
		var mainTimer = new Timer();
		Promise.all(engines.map(engine => {

			return engine.movePieceAsync({ from: { file: 2, rank: 7 }, to: { file: 2, rank: 6 } });

		})).then(() => {
			console.log("Total time: " + mainTimer.stop());
			done();	
		}).catch(done);
	});
});

class Timer {
	startTime = Date.now();
	stop = () => Date.now() - this.startTime;
}