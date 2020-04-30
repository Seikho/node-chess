import {
	Coordinate,
	Move
} from '../src/types';
import chess from '../src';
import {expect} from 'chai';
import deepCopy from '../src/engine/helpers/deepCopy';
const newBoard = chess.classic.engine;

describe("deep copy tests", () => {

	it("will return a copy of the board state", () => {
		var states = copyState();

		expect(states.left !== states.right).to.be.true;
	});

	it("will delete the moves array and not affect the other copy (no shared reference)", () => {
		var states = copyState();

		states.left.moves = [];
		expect(states.left.moves.length < states.right.moves.length).to.be.true;
	});

	it("will move a piece and not mutate the board's boardState", () => {
		var board = newBoard();
		var copy = deepCopy(board.boardState);

		var original = board.boardState;
		var future = board.calculateMovePiece({ from: c(1, 2), to: c(1, 3) }, board.boardState);

		expect(future).to.exist;

		var originalSquare = board.boardState.ranks[2].squares[1];
		var futureSquare = future ? future.newBoardState.ranks[2].squares[1] : null;

		expect(originalSquare.piece).to.exist;
		expect(futureSquare?.piece).to.not.exist;
	});

	it("will move a piece and not mutate the original boardState's moves", () => {
		var board = newBoard();
		board.positionParser("k6n/7p/8/8/8/8/7P/K6N w KQkq - 0 1");
		var o = board.boardState;

		var future = board.calculateMovePiece(m(c(8, 2), c(8, 3)), o);
		expect(o.moves.length).to.equal( future ? future.newBoardState.moves.length + 1 : null);

		var realFuture = board.movePiece(m(c(8, 2), c(8, 3)));
		expect(board.boardState.moves.length).to.equal(realFuture?.moves.length);
	});
});

function m(from: Coordinate, to: Coordinate): Move {
	return { from, to };
}

function c(file: number, rank: number) {
	return { file, rank };
}

function copyState() {
	var state = newBoard().boardState;

	return {
		left: state,
		right: deepCopy(state)
	};
}
