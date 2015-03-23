/// <reference path="typings/internal.d.ts" />
/**
 * Board: extensible board (TODO: more detail)
 */
var Board = (function () {
    function Board(ranks, files) {
        if (isNaN(ranks) || isNaN(files))
            throw "InvalidArgumentException: 'ranks' and 'files' must be a number";
        // Only accept positive, whole, organic, gluten-free numbers.
        this.rankCount = !!ranks ? Math.floor(Math.abs(ranks)) : 8;
        this.fileCount = !!ranks ? Math.floor(Math.abs(files)) : 8;
    }
    /**
     * Creates an empty board using a 2-dimensional, non-zero based array.
     */
    Board.prototype.create = function () {
        this.ranks = [];
        for (var rank = 0; rank < this.rankCount; rank++) {
            var row = {
                rank: rank,
                squares: []
            };
            for (var file = 0; file < this.fileCount; file++) {
                row.squares[file + 1] = {
                    file: file,
                    piece: null
                };
            }
            this.ranks[rank + 1] = row;
        }
    };
    /**
     * Returns an array of the available squares a piece can move to
     * TODO Export function to smaller module
     */
    Board.prototype.availableMoves = function (coordinate) {
        var moves = [];
        var square = this.getSquare(coordinate);
        if (!square)
            return moves;
    };
    /**
     * @return boolean Returns true if the piece moved to the toSquare
     */
    Board.prototype.movePieceTo = function (fromSquare, toSquare) {
        return false;
    };
    Board.prototype.getSquare = function (square) {
        var x = square.rank;
        var y = square.file;
        if (!this.ranks[x])
            return null;
        return this.ranks[x].squares[y] || null;
    };
    return Board;
})();
exports.Board = Board;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
    Direction[Direction["DiagonalUp"] = 4] = "DiagonalUp";
    Direction[Direction["DiagonalDown"] = 5] = "DiagonalDown";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
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
