import nodeChess = require("../src/index");
import chai = require("chai");
var expect = chai.expect;

var classicEngine = nodeChess.classicEngine();
classicEngine.populateAvailableMoves();
console.log(classicEngine.toString());


describe("available move tests", () => {
	pieceAvailableMovesTest("will find all available moves for the b2 pawn from the starting position", coord(2,2), [coord(2,3), coord(2,4)]);
	pieceAvailableMovesTest("will find all available moves for b1 knight from the starting position", coord(2,1), [coord(3,3), coord(1,3)]);
	pieceAvailableMovesTest("will find all available moves for c1 bishop from the starting position", coord(3,1), []);
	pieceAvailableMovesTest("will find all available moves for d1 queen from the starting position", coord(4,1), []);
	pieceAvailableMovesTest("will find all available moves for e1 king from the starting position", coord(5,1), []);
	pieceAvailableMovesTest("will find all available moves for b7 pawn from the starting position", coord(2,7), []);
	pieceAvailableMovesTest("will find no available moves for b8 knight from the starting position", coord(2,8), []);
	pieceAvailableMovesTest("will find all available moves for a7 pawn form the start position", coord(1,7), []);
});

describe("movement tests", () => {
	pieceMoveTest("[White] will move a2-a3", coord(1,2), coord(1,3), true);
	pieceMoveTest("[White] will not move a3-a4 due to being black's turn", coord(1,3), coord(1,4), false);
	pieceMoveTest("[Black] will move a7-a6", coord(1,7), coord(1,6), true);
	pieceMoveTest("[White] will move a3-a4", coord(1,3), coord(1,4), true);
	pieceMoveTest("[Black] will move a6-a5", coord(1,6), coord(1,5), true);
	pieceMoveTest("[White] will move not move a4-a5 due to 'cannot capture'", coord(1,5), coord(1,6), false);
	pieceMoveTest("[White] will move g1-h3", coord(7,1), coord(8,3), true);
	pieceMoveTest("[Black] will move b7-b5", coord(2,7), coord(2,5), true);
	pieceMoveTest("[White] will capture from a4-b5", coord(1,4), coord(2,5), true);
	pieceMoveTest("[Black] will move c7-c5, enabling enpassant capture on c6", coord(3,7), coord(3,5), true);
	pieceAvailableMovesTest("will find all available moves for white pawn on b5", coord(2,5), [coord(2,6), coord(3,6)]);
	pieceMoveTest("[White] will capture EnPassant from b5-c6", coord(2,5), coord(3,6), true);
	tagTest("enpassant tag on c6 will be removed after the capture", coord(3,6), "enpassant", undefined);
	pieceMoveTest("[Black] will move Nb8-Na6", coord(2,8), coord(1,6), true);
	pieceMoveTest("[White] will move g2 pawn two squares to for enpassant tag", coord(7, 2), coord(7,4), true);
	tagTest("will have enpassant tag on g3", coord(7,3), "enpassant", true);
	pieceMoveTest("[Black] will move Bc8-Bb7", coord(3,8), coord(2, 7), true);
	pieceMoveTest("[White] will move Bf1-Bg2 to enable white king-side castling", coord(6,1), coord(7,2), true);
	pieceMoveTest("[Black] will move Qd8-Qc7 enabling queenside castling", coord(4,8), coord(3,7), true);
	pieceAvailableMovesTest("[White] will be able to move Ke1-Kg1 (O-O) and Ke1-Kf1", coord(5,1), [coord(6,1), coord(7,1)]);
	pieceMoveTest("[White] will castle king side (Ke1-Kg1 or O-O)", coord(5,1), coord(7,1), true);
	pieceAvailableMovesTest("[Black] will be able to move Ke8-Kc8 (o-o-o) and Ke8-Kd8", coord(5,8), [coord(3,8), coord(4,8)]);
	
});

function tagTest(message: string, coordinate: Chess.Coordinate, tagName: string, expected: any) {
	it(message, () => {
		var square = classicEngine.getSquare(coordinate);
		expect(square.tags[tagName]).to.equal(expected);
	});
}

function pieceAvailableMovesTest(message: string, start: Chess.Coordinate, expectedMoves: Chess.Coordinate[]): void {
	it(message, () => {
		var moves = classicEngine
			.getSquare(start)
			.availableMoves
			.map(am => am.to);
			
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