var chess = require("../src/index");
var chai = require("chai");
var deepCopy = require("../src/engine/helpers/deepCopy");
var expect = chai.expect;
var newBoard = chess.classic.engine;
describe("deep copy tests", function () {
    it("will return a copy of the board state", function () {
        var states = copyState();
        expect(states.left !== states.right).to.be.true;
    });
    it("will delete the moves array and not affect the other copy (no shared reference)", function () {
        var states = copyState();
        states.left.moves = [];
        expect(states.left.moves.length < states.right.moves.length).to.be.true;
    });
    it("will mutate the first move and not affect the other first move (no shared reference)", function () {
        var states = copyState();
        states.left.moves[0].from = { file: 80, rank: 80 };
        var left = states.left.moves[0].from;
        var right = states.right.moves[0].from;
        expect(left.file).to.not.equal(right.file);
        expect(left.rank).to.not.equal(right.rank);
    });
    it("will move a piece and not mutate the board's boardState", function () {
        var board = newBoard();
        var copy = deepCopy(board.boardState);
        var original = board.boardState;
        var future = board.movePiece({ from: c(1, 2), to: c(1, 3) }, board.boardState);
        var originalSquare = board.boardState.ranks[2].squares[1];
        var futureSquare = future.ranks[2].squares[1];
        expect(originalSquare.piece).to.exist;
        expect(futureSquare.piece).to.not.exist;
    });
    it("will move a piece and not mutate the original boardState's moves", function () {
        var board = newBoard();
        board.positionParser("k6n/7p/8/8/8/8/7P/K6N w KQkq - 0 1");
        var o = board.boardState;
        var future = board.movePiece(m(c(8, 2), c(8, 3)), o);
        expect(o.moves.length).to.equal(future.moves.length + 1);
        var realFuture = board.movePiece(m(c(8, 2), c(8, 3)));
        expect(board.boardState.moves.length).to.equal(realFuture.moves.length);
    });
});
function m(from, to) {
    return { from: from, to: to };
}
function c(file, rank) {
    return { file: file, rank: rank };
}
function copyState() {
    var state = newBoard().boardState;
    return {
        left: state,
        right: deepCopy(state)
    };
}
//# sourceMappingURL=copy.js.map