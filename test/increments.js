var helper = require("../src/helper");
var chai = require("chai");
var Chess = require("../src/types");
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
describe("multiple movement tests", function () {
    multiMoveTest("it should move up two and left one", pos(2, 2), [move(0 /* Up */, 2), move(2 /* Left */, 1)], pos(4, 1));
    multiMoveTest("it should not move due to second SingleMove being out of bounds", pos(2, 2), [move(0 /* Up */, 2), move(2 /* Left */, 2)], pos(2, 2));
    multiMoveTest("it should not move due to first SingleMove being out of bounds", pos(2, 2), [move(0 /* Up */, 10), move(2 /* Left */, 1)], pos(2, 2));
    multiMoveTest("it should not remove due to both SingleMoves being out of bounds", pos(1, 1), [move(0 /* Up */, 10), move(2 /* Left */, 8)], pos(1, 1));
});
function singleMoveTest(message, start, direction, end) {
    it(message, function () {
        var incs = helper.getIncrementer(direction);
        var coordinate = helper.applyIncrements(start, incs);
        expect(coordinate.rank).to.equal(end.rank);
        expect(coordinate.file).to.equal(end.file);
    });
}
function multiMoveTest(message, start, moves, end) {
    it(message, function () {
        var incs = helper.singleMovesToIncrements(moves);
        var coordinate = helper.applyIncrements(start, incs);
        expect(coordinate.rank).to.equal(end.rank);
        expect(coordinate.file).to.equal(end.file);
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
//# sourceMappingURL=increments.js.map