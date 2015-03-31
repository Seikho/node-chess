var helper = require("./helper");
/**
 * Board: extensible board (TODO: more detail)
 */
var Board = (function () {
    function Board(ranks, files) {
        this.ranks = [];
        this.pieces = [];
        ranks = ranks || 8;
        files = files || 8;
        if (isNaN(ranks) || isNaN(files))
            throw "InvalidArgumentException: 'ranks' and 'files' must be a number";
        // Only accept positive, whole, organic, gluten-free numbers.
        this.rankCount = Math.floor(Math.abs(ranks));
        this.fileCount = Math.floor(Math.abs(files));
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
        if (!square.piece)
            return moves;
        for (var m in square.piece.movement) {
            var movePattern = square.piece.movement[m];
            var increments = [];
            for (var s in movePattern.moves) {
                increments.push({
                    incs: helper.getIncrementer(movePattern.moves[s].direction),
                    count: movePattern.moves[s].count
                });
            }
            if (increments.length === 0)
                return [];
            if (increments[0].length === 0)
                return [];
            for (var i = 0; i < increments[0].incs.length; i++) {
                var inc = increments[0].incs[i];
                if (inc.count > 0) {
                }
            }
        }
    };
    /**
     * @return boolean Returns true if the piece moved to the toSquare
     */
    Board.prototype.movePieceTo = function (fromSquare, toSquare) {
        return false;
    };
    Board.prototype.applySingleMoves = function (moves, coordinate) {
        for (var s in moves[0]) {
            var move = moves[0][s];
            var incs = helper.getIncrementer(move.direction);
            for (var i in incs) {
                var inc = incs[i];
                if (moves.length === 1) {
                }
            }
        }
        return [];
    };
    Board.prototype.applyIncrementer = function (coordinate, incrementer, count, piece) {
        var bounds = { rank: this.rankCount, file: this.fileCount };
        var coords = [];
        if (count > 0) {
            incrementer.file *= count;
            incrementer.rank *= count;
            coords.push(helper.applyIncrements(coordinate, [incrementer], bounds));
        }
        else {
            var count = 1;
            while (true) {
                var newInc = { file: incrementer.file * count, rank: incrementer.rank * count };
                var newCoord = helper.applyIncrements(coordinate, [newInc], bounds);
                if (!newCoord)
                    return coords;
                coords.push(newCoord);
                count++;
            }
        }
        return coords;
    };
    Board.prototype.getSquare = function (square) {
        var x = square.rank;
        var y = square.file;
        if (!this.ranks[x])
            return null;
        return this.ranks[x].squares[y] || null;
    };
    Board.prototype.toString = function () {
        var ranks = [];
        for (var i in this.ranks) {
            var pieces = [];
            var rank = this.ranks[i];
            for (var p in rank.squares) {
                var s = rank.squares[p];
                var val = s.piece == null ? "_" : s.piece.name.slice(0, 1);
                if (s.piece)
                    val = s.piece.isWhite ? val.toUpperCase() : val.toLowerCase();
                pieces.push("_" + val + "_");
            }
            ranks.push(pieces.join("|"));
        }
        return ranks.join("\r\n");
    };
    Board.prototype.applyMovePatterns = function (coordinate) {
        var square = this.ranks[coordinate.rank].squares[coordinate.file];
        var bounds = { rank: this.rankCount, file: this.fileCount };
        var coords = [];
        if (!square.piece)
            return [];
        for (var m in square.piece.movement) {
            var movePattern = square.piece.movement[m];
            for (var s in movePattern.moves) {
                var singleMove = movePattern.moves[s];
                if (singleMove.count > 0) {
                    var incrementers = helper.getIncrementer(singleMove.direction);
                    for (var i in incrementers) {
                        var incrementer = incrementer[i];
                        incrementer.file *= singleMove.count;
                        incrementer.rank *= singleMove.count;
                        var newCoord = helper.applyIncrements(coordinate, [incrementer], bounds);
                        if (!!newCoord)
                            coords.push(newCoord);
                    }
                }
                var count = 1;
                var addCoord = { file: 0, rank: 0 };
                while (!!addCoord) {
                    var incrementers = helper.getIncrementer(singleMove.direction);
                }
            }
        }
    };
    return Board;
})();
module.exports = Board;
