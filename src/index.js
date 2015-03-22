/// <reference path="typings/internal.d.ts" />
var Board = (function () {
    function Board() {
    }
    return Board;
})();
exports.Board = Board;
var Piece = (function () {
    function Piece() {
    }
    return Piece;
})();
exports.Piece = Piece;
var Analyzer = (function () {
    function Analyzer(board, options) {
        this.options = {};
        this.evaluation = 0;
        if (!options)
            options = {};
        this.options.interval = options.interval || 100;
        this.options.depth = options.depth || 5;
        this.options.time = options.time || 5;
        this.startTime = Date.now();
    }
    Analyzer.prototype.calculate = function (callback) {
        //TODO 
        callback(this.evaluation);
    };
    return Analyzer;
})();
exports.Analyzer = Analyzer;
