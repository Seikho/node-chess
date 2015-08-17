var chess = require("../src/index");
var chai = require("chai");
var Analysis = require("analysis");
var box = Analysis.descriptive.box;
var expect = chai.expect;
describe("benchmarks", function () {
    this.timeout(60000);
    var engines = [];
    it("will create a classic board 5000 times", function () {
        for (var x = 0; x < 500; x++) {
            engines.push(chess.classic.engine());
        }
    });
    it("will move a2-a3 500 times", function () {
        var times = engines.map(function (e) {
            var timer = new Timer();
            e.movePiece({ from: { file: 2, rank: 2 }, to: { file: 2, rank: 3 } });
            return timer.stop();
        });
        console.log(box(times));
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