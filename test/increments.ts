/// <reference path="../src/typings/internal.d.ts" />
import Board = require("../src/index");
import helper = require("../src/helper");
import chai = require("chai");
import Chess = require("../src/types");

var expect = chai.expect;

describe("increment tests", () => {
	it("should return an array with length above 0", () => {
		var incs = incrementTest(pos(1,1), Chess.Direction.Up);
		expect(incs.length).to.equal(1);
	});
});

function incrementTest(coordinate: Chess.Coordinate, direction: Chess.Direction): Chess.Coordinate[] {
	var incs = helper.getIncrementer(direction);
	return helper.applyIncrements(coordinate, incs);
}

function pos(rank: number, file: number): Chess.Coordinate {
	return { rank: rank, file: file };
}

