var nodeChess = require("../src/index");
var chai = require("chai");
var expect = chai.expect;
var board = nodeChess.classic.engine();
board.populateAvailableMoves();
var checkmate = nodeChess.classic.engine();
checkmate.positionParser("6bk/6pp/3N4/8/8/8/PP2PPPP/RNBQKB1R w KQkq - 0 1");
checkmate.populateAvailableMoves();
console.log(checkmate.toString());
//console.log(board.toString());
describe("available move tests", function () {
    pieceAvailableMovesTest("will find all available moves for the b2 pawn from the starting position", coord(2, 2), [coord(2, 3), coord(2, 4)]);
    pieceAvailableMovesTest("will find all available moves for b1 knight from the starting position", coord(2, 1), [coord(3, 3), coord(1, 3)]);
    pieceAvailableMovesTest("will find all available moves for c1 bishop from the starting position", coord(3, 1), []);
    pieceAvailableMovesTest("will find all available moves for d1 queen from the starting position", coord(4, 1), []);
    pieceAvailableMovesTest("will find all available moves for e1 king from the starting position", coord(5, 1), []);
    pieceAvailableMovesTest("will find all available moves for b7 pawn from the starting position", coord(2, 7), [coord(2, 6), coord(2, 5)]);
    pieceAvailableMovesTest("will find no available moves for b8 knight from the starting position", coord(2, 8), [coord(1, 6), coord(3, 6)]);
    pieceAvailableMovesTest("will find all available moves for a7 pawn form the start position", coord(1, 7), [coord(1, 6), coord(1, 5)]);
});
describe("movement tests", function () {
    pieceMoveTest("[White] will move a2-a3", coord(1, 2), coord(1, 3));
    pieceMoveTest("[White] will not move a3-a4 due to being black's turn", coord(1, 3), coord(1, 4), true);
    pieceMoveTest("[Black] will move a7-a6", coord(1, 7), coord(1, 6));
    pieceMoveTest("[White] will move a3-a4", coord(1, 3), coord(1, 4));
    pieceMoveTest("[Black] will move a6-a5", coord(1, 6), coord(1, 5));
    pieceMoveTest("[White] will move not move a4-a5 due to 'cannot capture'", coord(1, 5), coord(1, 6), true);
    pieceMoveTest("[White] will move g1-h3", coord(7, 1), coord(8, 3));
    pieceMoveTest("[Black] will move b7-b5", coord(2, 7), coord(2, 5));
    pieceMoveTest("[White] will capture from a4-b5", coord(1, 4), coord(2, 5));
    pieceMoveTest("[Black] will move c7-c5, enabling enpassant capture on c6", coord(3, 7), coord(3, 5));
    pieceAvailableMovesTest("will find all available moves for white pawn on b5", coord(2, 5), [coord(2, 6), coord(3, 6)]);
    pieceMoveTest("[White] will capture EnPassant from b5-c6", coord(2, 5), coord(3, 6));
    tagTest("enpassant tag on c6 will be removed after the capture", coord(3, 6), "enpassant", undefined);
    pieceMoveTest("[Black] will move Nb8-Na6", coord(2, 8), coord(1, 6));
    pieceMoveTest("[White] will move g2 pawn two squares to for enpassant tag", coord(7, 2), coord(7, 4));
    tagTest("will have enpassant tag on g3", coord(7, 3), "enpassant", true);
    pieceMoveTest("[Black] will move Bc8-Bb7", coord(3, 8), coord(2, 7));
    pieceMoveTest("[White] will move Bf1-Bg2 to enable white king-side castling", coord(6, 1), coord(7, 2));
    pieceMoveTest("[Black] will move Qd8-Qc7 enabling queenside castling", coord(4, 8), coord(3, 7));
    pieceAvailableMovesTest("[White] will be able to move Ke1-Kg1 (O-O) and Ke1-Kf1", coord(5, 1), [coord(6, 1), coord(7, 1)]);
    pieceMoveTest("[White] will castle king side (Ke1-Kg1 or O-O)", coord(5, 1), coord(7, 1));
    pieceLocationTest("will have white rook on f1 after castling", coord(6, 1), "R");
    pieceAvailableMovesTest("[Black] will be able to move Ke8-Kc8 (o-o-o) and Ke8-Kd8", coord(5, 8), [coord(3, 8), coord(4, 8)]);
    pieceMoveTest("[Black] will castle queen side (Ke8-Kc8 or o-o-o)", coord(5, 8), coord(3, 8));
    pieceLocationTest("will have black rook on d8 after castling", coord(4, 8), "r");
});
function tagTest(message, coordinate, tagName, expected) {
    it(message, function () {
        var square = board.getSquare(coordinate);
        expect(square.tags[tagName]).to.equal(expected);
    });
}
function pieceLocationTest(message, location, notation) {
    it(message, function () {
        var square = board.getSquare(location);
        expect(square.piece.notation).to.equal(notation);
    });
}
function pieceAvailableMovesTest(message, start, expectedMoves) {
    it(message, function () {
        var moves = board.boardState.moves
            .filter(function (move) { return move.from.file === start.file && move.from.rank === start.rank; })
            .map(function (move) { return move.to; });
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
/**
 * Test that a piece successfully moved
 */
var count = 0;
function pieceMoveTest(message, from, to, wont) {
    if (wont === void 0) { wont = false; }
    it(message, function () {
        var expected = wont ? from : to;
        var square = board.getSquare(from);
        var piece = board.getSquare(from).piece;
        var newState = board.movePiece(from, to);
        var moved = board.getSquare(expected, newState);
        var movedPiece = moved.piece;
        if (wont) {
            expect(newState).to.be.null;
            return;
        }
        // A bit elaborate due to immutability of movePiece function
        expect(movedPiece).to.exist;
        expect(movedPiece.location.file).to.equal(expected.file);
        expect(movedPiece.location.rank).to.equal(expected.rank);
        expect(movedPiece.isWhite).to.equal(piece.isWhite);
        expect(movedPiece.notation).to.equal(piece.notation);
    });
}
//# sourceMappingURL=increments.js.map