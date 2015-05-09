var chai = require("chai");
var classic = require("../src/engine/instances/classic");
var classicEngine = classic();
classicEngine.populateAvailableMoves();
classicEngine.getSquare(coord(1, 2)).piece.getConditionalMoves();
var expect = chai.expect;
describe("available move tests", function () {
    pieceAvailableMovesTest("will find all available moves for the b2 pawn from the starting position", coord(2, 2), [coord(2, 3), coord(2, 4)]);
    pieceAvailableMovesTest("will find all available moves for b1 knight from the starting position", coord(2, 1), [coord(3, 3), coord(1, 3)]);
    pieceAvailableMovesTest("will find all available moves for c1 bishop from the starting position", coord(3, 1), []);
    pieceAvailableMovesTest("will find all available moves for d1 queen from the starting position", coord(4, 1), []);
    pieceAvailableMovesTest("will find all available moves for e1 king from the starting position", coord(5, 1), []);
    pieceAvailableMovesTest("will find all available moves for b7 pawn from the starting position", coord(2, 7), [coord(2, 6), coord(2, 5)]);
    pieceAvailableMovesTest("will find all available moves for b8 knight from the starting position", coord(2, 8), [coord(1, 6), coord(3, 6)]);
    pieceAvailableMovesTest("will find all available moves for a7 pawn form the start position", coord(1, 7), [coord(1, 6), coord(1, 5)]);
});
describe("movement tests", function () {
    pieceMoveTest("[White] will move a2 pawn to a3", coord(1, 2), coord(1, 3), true);
    pieceMoveTest("[White] will not move a3 pawn to a4 due to being black's turn", coord(1, 3), coord(1, 4), false);
    pieceAvailableMovesTest("will find all available moves for the a3 pawn", coord(1, 3), [coord(1, 4)]);
    pieceMoveTest("[White] will not move a3 pawn to a5", coord(1, 3), coord(1, 5), false);
    pieceMoveTest("[Black] will move a7 pawn to a6", coord(1, 7), coord(1, 6), true);
    pieceMoveTest("[White] will move a3 pawn to a4", coord(1, 3), coord(1, 4), true);
    pieceMoveTest("[Black] will move a6 pawn to a5", coord(1, 6), coord(1, 5), true);
    pieceMoveTest("[White] will move not move a4 pawn to a6 due to 'cannot capture'", coord(1, 5), coord(1, 6), false);
    pieceMoveTest("[White] will move g1 to h3", coord(7, 1), coord(8, 3), true);
    pieceMoveTest("[Black] will move b7 pawn to b5", coord(2, 7), coord(2, 5), true);
    pieceMoveTest("[White] will capture from a4 to b5", coord(1, 4), coord(2, 5), true);
});
function pieceAvailableMovesTest(message, start, expectedMoves) {
    it(message, function () {
        var moves = classicEngine.getSquare(start).availableMoves;
        expectedMoves.forEach(function (m) { return expect(moves).to.include({ rank: m.rank, file: m.file }); });
        expect(expectedMoves.length).to.equal(moves.length);
    });
}
function coord(file, rank) {
    return { file: file, rank: rank };
}
function compare(left, right) {
    return left.rank === right.rank && left.file === right.file;
}
function move(direction, count) {
    return { direction: direction, count: count };
}
function pieceMoveTest(message, from, to, expected) {
    it(message, function () {
        var moveResult = classicEngine.movePiece(from, to);
        expect(expected).to.equal(moveResult);
    });
}
//# sourceMappingURL=increments.js.map