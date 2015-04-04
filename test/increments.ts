import Board = require("../src/board");
import helper = require("../src/helper");
import chai = require("chai");
import Chess = require("../src/types");
import pieces = require("../src/pieces/pieces");
import classic = require("../src/boards/classic");

var classicBoard = classic();
console.log(classicBoard.toString());

var expect = chai.expect;
var dir = Chess.Direction;
describe("single movement tests", () => {
	singleMoveTest("will move the rank up one square", coord(1,1), dir.Up, coord(1,2));
	singleMoveTest("will move the rank down one square", coord(1,2), dir.Down, coord(1,1));
	singleMoveTest("will move the file left one square", coord(2,2), dir.Left, coord(1,2));
	singleMoveTest("will move the file right one square", coord(2,2), dir.Right, coord(3,2));
	singleMoveTest("will not move up due to out of bounds movement", coord(4,8), dir.Up, coord(4,8));
	singleMoveTest("will not move down due to out of bounds movement", coord(4,1), dir.Down, coord(4,1));
	singleMoveTest("will not move left due to out of bounds movement", coord(1,4), dir.Left, coord(1,4));
	singleMoveTest("will not move right due to out of bounds movement", coord(8,4), dir.Right, coord(8,4));
});

describe("available move tests", () => {
	pieceMoveTest("will find all available moves for the b2 pawn from the starting position", coord(2,2), [coord(2,3), coord(1,3), coord(3,3)]);
	pieceMoveTest("will find all available moves for b1 knight from the starting position", coord(2,1), [coord(3,3), coord(1,3)]);
	pieceMoveTest("will find all available moves for c1 bishop from the starting position", coord(3,1), [coord(2,2), coord(1,3), coord(4,2), coord(5,3), coord(6,4), coord(7,5), coord(8,6)]);
	pieceMoveTest("will find all available moves for d1 queen from the starting position", coord(4,1), []);
});

function singleMoveTest(message: string, start: Chess.Coordinate, direction: Chess.Direction, end: Chess.Coordinate): void {
	it(message, () => {
		var incs = helper.getIncrementer(direction);
		var coordinate = helper.applyIncrements(start, incs);	
		expect(coordinate.rank).to.equal(end.rank);
		expect(coordinate.file).to.equal(end.file);
	});
}

function pieceMoveTest(message: string, start: Chess.Coordinate, expectedMoves: Chess.Coordinate[]): void {
	it(message, () => {
		var moves = classicBoard.availableMoves(start);
		expectedMoves.forEach(m => expect(moves).to.include({rank: m.rank, file: m.file }));
		//expectedMoves.forEach(move => expect(moves.some(m => m.rank === move.rank && m.file === move.file)).to.equal(true));
	});
}

function coord(file: number, rank: number) {
	return { file: file, rank: rank };
}

function compare(left: Chess.Coordinate, right: Chess.Coordinate): boolean {
	return left.rank === right.rank && left.file === right.file;
}

function move(direction: Chess.Direction, count: number): Chess.SingleMove {
	return { direction: direction, count: count };
}
