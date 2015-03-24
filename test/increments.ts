/// <reference path="../src/typings/internal.d.ts" />
import Board = require("../src/index");
import helper = require("../src/helper");
import chai = require("chai");
import Chess = require("../src/types");

var expect = chai.expect;

describe("movement tests", () => {
	incrementTest("will move the rank up one square", pos(1,1), Chess.Direction.Up, pos(2,1));
	incrementTest("will move the rank down one square", pos(2,1), Chess.Direction.Down, pos(1,1));
	incrementTest("will move the file left one square", pos(2,2), Chess.Direction.Left, pos(2,1));
	incrementTest("will move the file right one square", pos(2,2), Chess.Direction.Right, pos(2,3));
	incrementTest("will not move up due to out of bounds movement", pos(8,8), Chess.Direction.Up, pos(8,8));
	incrementTest("will not move down due to out of bounds movement", pos(1,1), Chess.Direction.Down, pos(1,1));
});

function incrementTest(message: string, coordinate: Chess.Coordinate, direction: Chess.Direction, expected: Chess.Coordinate): void {
	it(message, () => {
		var incs = helper.getIncrementer(direction);
		var coordinates = helper.applyIncrements(coordinate, incs);
		expect(coordinates[0].rank).to.equal(expected.rank);
		expect(coordinates[0].file).to.equal(expected.file);
	});
}

function pos(rank: number, file: number): Chess.Coordinate {
	return { rank: rank, file: file };
}

function compare(left: Chess.Coordinate, right: Chess.Coordinate): boolean {
	return left.rank === right.rank && left.file === right.file;
}
