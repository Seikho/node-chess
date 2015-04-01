/// <reference path="../src/typings/internal.d.ts" />
import Board = require("../src/board");
import helper = require("../src/helper");
import chai = require("chai");
import Chess = require("../src/types");
import pieces = require("../src/pieces/pieces");

var expect = chai.expect;
var dir = Chess.Direction;
describe("single movement tests", () => {
	singleMoveTest("will move the rank up one square", pos(1,1), dir.Up, pos(2,1));
	singleMoveTest("will move the rank down one square", pos(2,1), dir.Down, pos(1,1));
	singleMoveTest("will move the file left one square", pos(2,2), dir.Left, pos(2,1));
	singleMoveTest("will move the file right one square", pos(2,2), dir.Right, pos(2,3));
	singleMoveTest("will not move up due to out of bounds movement", pos(8,4), dir.Up, pos(8,4));
	singleMoveTest("will not move down due to out of bounds movement", pos(1,4), dir.Down, pos(1,4));
	singleMoveTest("will not move left due to out of bounds movement", pos(4,1), dir.Left, pos(4,1));
	singleMoveTest("will not move right due to out of bounds movement", pos(4,8), dir.Right, pos(4,8));
});

function singleMoveTest(message: string, start: Chess.Coordinate, direction: Chess.Direction, end: Chess.Coordinate): void {
	it(message, () => {
		var incs = helper.getIncrementer(direction);
		var coordinate = helper.applyIncrements(start, incs);	
		expect(coordinate.rank).to.equal(end.rank);
		expect(coordinate.file).to.equal(end.file);
	});
}

// function movePatternTest(message: string, start: Chess.Coordinate, piece: Chess.Piece, hasCoordinates: Chess.Coordinate[]) {
// 	it(message, () => {
// 		piece.
// 	});
// }

function pos(rank: number, file: number): Chess.Coordinate {
	return { rank: rank, file: file };
}

function compare(left: Chess.Coordinate, right: Chess.Coordinate): boolean {
	return left.rank === right.rank && left.file === right.file;
}

function move(direction: Chess.Direction, count: number): Chess.SingleMove {
	return { direction: direction, count: count };
}
