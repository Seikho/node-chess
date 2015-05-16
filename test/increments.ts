import nodeChess = require("../src/index");
import chai = require("chai");
var expect = chai.expect;

var classicEngine = nodeChess.classicEngine();
classicEngine.populateAvailableMoves();
classicEngine.getSquare(coord(1,2)).piece.getConditionalMoves(classicEngine);
console.log(classicEngine.toString());


describe("available move tests", () => {
	pieceAvailableMovesTest("will find all available moves for the b2 pawn from the starting position", coord(2,2), [coord(2,3), coord(2,4)]);
	pieceAvailableMovesTest("will find all available moves for b1 knight from the starting position", coord(2,1), [coord(3,3), coord(1,3)]);
	pieceAvailableMovesTest("will find all available moves for c1 bishop from the starting position", coord(3,1), []);
	pieceAvailableMovesTest("will find all available moves for d1 queen from the starting position", coord(4,1), []);
	pieceAvailableMovesTest("will find all available moves for e1 king from the starting position", coord(5,1), []);
	pieceAvailableMovesTest("will find all available moves for b7 pawn from the starting position", coord(2,7), [coord(2,6), coord(2,5)]);
	pieceAvailableMovesTest("will find all available moves for b8 knight from the starting position", coord(2,8), [coord(1,6), coord(3,6)]);
	pieceAvailableMovesTest("will find all available moves for a7 pawn form the start position", coord(1,7), [coord(1,6), coord(1,5)]);
});

describe("movement tests", () => {
	pieceMoveTest("[White] will move a2 pawn to a3", coord(1,2), coord(1,3), true);
	pieceMoveTest("[White] will not move a3 pawn to a4 due to being black's turn", coord(1,3), coord(1,4), false);
	pieceAvailableMovesTest("will find all available moves for the a3 pawn", coord(1,3), [coord(1,4)]);
	pieceMoveTest("[White] will not move a3 pawn to a5", coord(1,3), coord(1,5), false);
	pieceMoveTest("[Black] will move a7 pawn to a6", coord(1,7), coord(1,6), true);
	pieceMoveTest("[White] will move a3 pawn to a4", coord(1,3), coord(1,4), true);
	pieceMoveTest("[Black] will move a6 pawn to a5", coord(1,6), coord(1,5), true);
	pieceMoveTest("[White] will move not move a4 pawn to a6 due to 'cannot capture'", coord(1,5), coord(1,6), false);
	pieceMoveTest("[White] will move g1 to h3", coord(7,1), coord(8,3), true);
	pieceMoveTest("[Black] will move b7 pawn to b5", coord(2,7), coord(2,5), true);
	pieceMoveTest("[White] will capture from a4 to b5", coord(1,4), coord(2,5), true);
	pieceMoveTest("[Black] will move c7 pawn to c5, enabling enpassant capture", coord(3,7), coord(3,5), true);
	pieceMoveTest("[White] will capture EnPassant from b5 to c6", coord(2,5), coord(3,6), true);
});

function pieceAvailableMovesTest(message: string, start: Chess.Coordinate, expectedMoves: Chess.Coordinate[]): void {
	it(message, () => {
		var moves = classicEngine.getSquare(start).availableMoves;
		expectedMoves.forEach(m => expect(moves).to.include({rank: m.rank, file: m.file }));
		expect(expectedMoves.length).to.equal(moves.length);
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

function pieceMoveTest(message: string, from: Chess.Coordinate, to: Chess.Coordinate, expected: boolean) {
	it (message, () => {
		var moveResult = classicEngine.movePiece(from, to);
		expect(expected).to.equal(moveResult);
	});
}