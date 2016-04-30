import Engine from '../src/engine';
import chess = require('../src/index');
import Promise = require("bluebird");
import {expect} from 'chai';
const Analysis = require('analysis');
const box = Analysis.descriptive.box;

describe("benchmarks", function() {
	this.timeout(60000);
	var engines: Engine[] = [];

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
});

class Timer {
	startTime = Date.now();
	stop = () => Date.now() - this.startTime;
}