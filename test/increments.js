/// <reference path="../src/typings/internal.d.ts" />
/// <reference path="../src/typings/tsd.d.ts" />
var Board = require("../src/index");
var helper = require("../src/helper");
var chai = require("chai");
var expect = chai.expect;
describe("increment tests", function () {
    it("should return an array with length above 0", function () {
        var incs = incrementTest(pos(1, 1), 0 /* Up */);
        expect(incs.length).to.equal(1);
    });
});
function incrementTest(coordinate, direction) {
    var incs = helper.getIncrementer(direction);
    return helper.applyIncrements(coordinate, incs);
}
function pos(rank, file) {
    return { rank: rank, file: file };
}
