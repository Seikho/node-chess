var chai = require("chai");
var Chess = require("../src/types");
var classic = require("../src/engine/instances/classic");
var classicEngine = classic();
console.log(classicEngine.toString());
var expect = chai.expect;
var dir = Chess.Direction;
describe("available move tests", function () {
    pieceMoveTest("will find all available moves for the b2 pawn from the starting position", coord(2, 2), [coord(2, 3), coord(1, 3), coord(3, 3)]);
    pieceMoveTest("will find all available moves for b1 knight from the starting position", coord(2, 1), [coord(3, 3), coord(1, 3)]);
    pieceMoveTest("will find all available moves for c1 bishop from the starting position", coord(3, 1), [coord(2, 2), coord(1, 3), coord(4, 2), coord(5, 3), coord(6, 4), coord(7, 5), coord(8, 6)]);
    pieceMoveTest("will find all available moves for d1 queen from the starting position", coord(4, 1), [coord(4, 2), coord(4, 3), coord(4, 4), coord(4, 5), coord(4, 6), coord(4, 7), coord(4, 8)]);
    pieceMoveTest("will find all available moves for e1 king from the starting position", coord(5, 1), [coord(4, 1), coord(6, 1), coord(4, 2), coord(5, 2), coord(6, 2)]);
    pieceMoveTest("will find all available moves for b7 pawn from the starting position", coord(2, 7), [coord(2, 6), coord(1, 6), coord(3, 6)]);
    pieceMoveTest("will find all available moves for b8 knight from the starting position", coord(2, 8), [coord(1, 6), coord(3, 6), coord(4, 7)]);
});
function pieceMoveTest(message, start, expectedMoves) {
    it(message, function () {
        var moves = classicEngine.availableMoves(start);
        expectedMoves.forEach(function (m) { return expect(moves).to.include({ rank: m.rank, file: m.file }); });
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
//# sourceMappingURL=increments.js.map