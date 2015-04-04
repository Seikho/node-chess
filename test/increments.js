var helper = require("../src/helper");
var chai = require("chai");
var Chess = require("../src/types");
var classic = require("../src/boards/classic");
var classicBoard = classic();
console.log(classicBoard.toString());
var expect = chai.expect;
var dir = Chess.Direction;
describe("single movement tests", function () {
    singleMoveTest("will move the rank up one square", coord(1, 1), 0 /* Up */, coord(1, 2));
    singleMoveTest("will move the rank down one square", coord(1, 2), 1 /* Down */, coord(1, 1));
    singleMoveTest("will move the file left one square", coord(2, 2), 2 /* Left */, coord(1, 2));
    singleMoveTest("will move the file right one square", coord(2, 2), 3 /* Right */, coord(3, 2));
    singleMoveTest("will not move up due to out of bounds movement", coord(4, 8), 0 /* Up */, coord(4, 8));
    singleMoveTest("will not move down due to out of bounds movement", coord(4, 1), 1 /* Down */, coord(4, 1));
    singleMoveTest("will not move left due to out of bounds movement", coord(1, 4), 2 /* Left */, coord(1, 4));
    singleMoveTest("will not move right due to out of bounds movement", coord(8, 4), 3 /* Right */, coord(8, 4));
});
describe("available move tests", function () {
    pieceMoveTest("will find all available moves for the b2 pawn from the starting position", coord(2, 2), [coord(2, 3), coord(1, 3), coord(3, 3)]);
    pieceMoveTest("will find all available moves for b1 knight from the starting position", coord(2, 1), [coord(3, 3), coord(1, 3)]);
    pieceMoveTest("will find all available moves for c1 bishop from the starting position", coord(3, 1), [coord(2, 2), coord(1, 3), coord(4, 2), coord(5, 3), coord(6, 4), coord(7, 5), coord(8, 6)]);
    pieceMoveTest("will find all available moves for d1 queen from the starting position", coord(4, 1), []);
});
function singleMoveTest(message, start, direction, end) {
    it(message, function () {
        var incs = helper.getIncrementer(direction);
        var coordinate = helper.applyIncrements(start, incs);
        expect(coordinate.rank).to.equal(end.rank);
        expect(coordinate.file).to.equal(end.file);
    });
}
function pieceMoveTest(message, start, expectedMoves) {
    it(message, function () {
        var moves = classicBoard.availableMoves(start);
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