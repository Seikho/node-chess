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
        this.evaluation = 0;
    }
    Analyzer.prototype.calculate = function (callback) {
        //TODO 
        callback(this.evaluation);
    };
    return Analyzer;
})();
exports.Analyzer = Analyzer;
