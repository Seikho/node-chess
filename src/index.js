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
    Board.prototype.availableMoves = function (coordinate) {
        var moves = [];
        var square = this.getSquare(coordinate);
        if (!square)
            return moves;
    };
    Board.prototype.getSquaresForMove = function (coordinate, movePattern, isWhite) {
        isWhite = isWhite || true;
        var coordinates = [];
        var moves = movePattern.moves;
        if (moves.length > 2)
            return coordinates;
        if (moves.length === 2) {
            if (moves[0].count === 0 && moves[1].count === 0)
                return coordinates;
            var incLeft = this.getIncrementer(moves[0].direction);
            var incRight = this.getIncrementer(moves[1].direction);
            if (!isWhite) {
                incLeft = this.inverseCoordinates(incLeft);
                incRight = this.inverseCoordinates(incRight);
            }
            if (moves[0].count !== 0 && moves[1].count !== 0) {
            }
        }
        movePattern.moves.forEach(function (singleMove) {
        });
    };
    Board.prototype.getSquareForMoves = function (coordinate, movePatterns) {
        var _this = this;
        var coordinates = [];
        movePatterns.forEach(function (move) { return coordinates.concat(_this.getSquaresForMove(coordinate, move)); });
        return coordinates;
    };
    Board.prototype.inverseCoordinates = function (coordinates) {
        return coordinates.map(function (coord) {
            return { rank: coord.rank *= 1, file: coord.file *= -1 };
        });
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
    Board.prototype.getIncrementer = function (direction) {
        switch (direction) {
            case Chess.Direction.Up:
                return [{ rank: 1, file: 0 }];
            case Chess.Direction.Down:
                return [{ rank: -1, file: 0 }];
            case Chess.Direction.Left:
                return [{ rank: 0, file: -1 }];
            case Chess.Direction.Right:
                return [{ rank: 0, file: 1 }];
            case Chess.Direction.DiagonalUp:
                return [{ rank: 1, file: -1 }, { rank: 1, file: 1 }];
            case Chess.Direction.DiagonalDown:
                return [{ rank: -1, file: -1 }, { rank: -1, file: 1 }];
            default:
                throw "InvalidDirectionException: The direction provided was invalid";
        }
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