var helper = require("../src/helper");
var chai = require("chai");
var Chess = require("../src/types");
var expect = chai.expect;
describe("movement tests", function () {
    incrementTest("will move the rank up one square", pos(1, 1), 0 /* Up */, pos(2, 1));
    incrementTest("will move the rank down one square", pos(2, 1), 1 /* Down */, pos(1, 1));
    incrementTest("will move the file left one square", pos(2, 2), 2 /* Left */, pos(2, 1));
    incrementTest("will move the file right one square", pos(2, 2), 3 /* Right */, pos(2, 3));
    incrementTest("will not move up due to out of bounds movement", pos(8, 8), 0 /* Up */, pos(8, 8));
    incrementTest("will not move down due to out of bounds movement", pos(1, 1), 1 /* Down */, pos(1, 1));
});
function incrementTest(message, coordinate, direction, expected) {
    it(message, function () {
        var incs = helper.getIncrementer(direction);
        var coordinates = helper.applyIncrements(coordinate, incs);
        expect(coordinates[0].rank).to.equal(expected.rank);
        expect(coordinates[0].file).to.equal(expected.file);
    });
}
function pos(rank, file) {
    return { rank: rank, file: file };
}
function compare(left, right) {
    return left.rank === right.rank && left.file === right.file;
}
//# sourceMappingURL=increments.js.map