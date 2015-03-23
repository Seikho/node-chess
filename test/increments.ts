/// <reference path="../src/typings/internal.d.ts" />
/// <reference path="../src/typings/tsd.d.ts" />
import Board = require("../src/index");
import helper = require("../src/helper");
import chai = require("chai");

var expect = chai.expect;

describe("increment tests", () => {
	it("should return an array with length above 0", () => {
		var incs = incrementTest(pos(1,1), Board.Direction.Up);
		expect(incs.length).to.equal(1);
	});
});

function incrementTest(coordinate: Coordinate, direction: Board.Direction): Coordinate[] {
	var incs = helper.getIncrementer(direction);
	return helper.applyIncrements(coordinate, incs);
}

function pos(rank: number, file: number): Coordinate {
	return { rank: rank, file: file };
}
