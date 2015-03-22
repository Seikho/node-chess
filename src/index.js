var Board = (function () {
    function Board(ranks, files) {
        if (isNaN(ranks) || isNaN(files))
            throw "InvalidArgumentException: 'ranks' and 'files' must be a number";
        this.rankCount = !!ranks ? Math.floor(Math.abs(ranks)) : 8;
        this.fileCount = !!ranks ? Math.floor(Math.abs(files)) : 8;
    }
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
    Board.prototype.availableMoves = function (square) {
        return [];
    };
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
        callback(this.evaluation);
    };
    return Analyzer;
})();
exports.Analyzer = Analyzer;
//# sourceMappingURL=index.js.map