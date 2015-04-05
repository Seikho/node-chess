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
     */
    Board.prototype.availableMoves = function (coordinate) {
        var square = this.getSquare(coordinate);
        return helper.getSquaresForMoves(coordinate, square.piece);
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
    Board.prototype.toString = function () {
        var ranks = [];
        var fileLabels = ['-'];
        for (var i = this.rankCount; i > 0; i--) {
            fileLabels[i] = "_" + i + "_";
            var pieces = [i];
            var rank = this.ranks[i];
            for (var p in rank.squares) {
                var s = rank.squares[p];
                var val = s.piece == null ? "_" : s.piece.notation;
                if (s.piece)
                    val = s.piece.isWhite ? val.toUpperCase() : val.toLowerCase();
                pieces.push("_" + val + "_");
            }
            ranks.push(pieces.join("|"));
        }
        ranks.push(fileLabels.join("|"));
        return ranks.join("\r\n");
    };
    return Board;
})();
module.exports = Board;
//# sourceMappingURL=board.js.map