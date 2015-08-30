var chess = require("../src/index");
var Promise = require("bluebird");
var chai = require("chai");
var Analysis = require("analysis");
var box = Analysis.descriptive.box;
var expect = chai.expect;
describe("benchmarks", function () {
    this.timeout(60000);
    var engines = [];
    var times = 100;
    it("will create a classic board " + times + " times", function () {
        for (var x = 0; x < times; x++) {
            engines.push(chess.classic.engine());
        }
    });
    it("will move a2-a3 " + times + " times", function () {
        var times = engines.map(function (e) {
            var timer = new Timer();
            e.movePiece({ from: { file: 2, rank: 2 }, to: { file: 2, rank: 3 } });
            return timer.stop();
        });
        console.log(box(times));
    });
    it("will move a7-a6 " + times + " using movePieceAsync", function (done) {
        var mainTimer = new Timer();
        Promise.all(engines.map(function (engine) {
            return engine.movePieceAsync({ from: { file: 2, rank: 7 }, to: { file: 2, rank: 6 } });
        })).then(function () {
            console.log("Total time: " + mainTimer.stop());
            done();
        }).catch(done);
    });
});
var Timer = (function () {
    function Timer() {
        var _this = this;
        this.startTime = Date.now();
        this.stop = function () { return Date.now() - _this.startTime; };
    }
    return Timer;
})();
//# sourceMappingURL=benchmark.js.map