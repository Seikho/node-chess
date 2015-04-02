var helper = require("../src/helper");
var chai = require("chai");
var Chess = require("../src/types");
var classic = require("../src/boards/classic");
var classicBoard = classic();
console.log(classicBoard.toString());
var expect = chai.expect;
var dir = Chess.Direction;
describe("single movement tests", function () {
    singleMoveTest("will move the rank up one square", pos(1, 1), 0 /* Up */, pos(2, 1));
    singleMoveTest("will move the rank down one square", pos(2, 1), 1 /* Down */, pos(1, 1));
    singleMoveTest("will move the file left one square", pos(2, 2), 2 /* Left */, pos(2, 1));
    singleMoveTest("will move the file right one square", pos(2, 2), 3 /* Right */, pos(2, 3));
    singleMoveTest("will not move up due to out of bounds movement", pos(8, 4), 0 /* Up */, pos(8, 4));
    singleMoveTest("will not move down due to out of bounds movement", pos(1, 4), 1 /* Down */, pos(1, 4));
    singleMoveTest("will not move left due to out of bounds movement", pos(4, 1), 2 /* Left */, pos(4, 1));
    singleMoveTest("will not move right due to out of bounds movement", pos(4, 8), 3 /* Right */, pos(4, 8));
});
describe("available move tests", function () {
    pieceMoveTest("will find all available moves for a pawn from the starting position", pos(2, 2), [pos(3, 2), pos(3, 1), pos(3, 3)]);
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
        expectedMoves.forEach(function (move) { return expect(moves.some(function (m) { return m.rank === move.rank && m.file === move.file; })).to.equal(true); });
    });
}
function pos(rank, file) {
    return { rank: rank, file: file };
}
function compare(left, right) {
    return left.rank === right.rank && left.file === right.file;
}
function move(direction, count) {
    return { direction: direction, count: count };
}
