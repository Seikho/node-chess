var toString = require("./helpers/toString");
var getMoves = require("./helpers/getMoves");
var fenParser = require("./parsers/fen");
/**
 * Board: extensible board (TODO: more detail)
 */
var Engine = (function () {
    function Engine(ranks, files) {
        this.ranks = [];
        this.pieces = [];
        ranks = ranks || 8;
        files = files || 8;
        if (isNaN(ranks) || isNaN(files))
            throw "InvalidArgumentException: 'ranks' and 'files' must be a number";
        // Only accept positive, whole, organic, gluten-free numbers.
        this.positionParser = fenParser;
        this.rankCount = Math.floor(Math.abs(ranks));
        this.fileCount = Math.floor(Math.abs(files));
        this.toString = toString;
    }
    /**
     * Creates an empty board using a 2-dimensional, non-zero based array.
     */
    Engine.prototype.create = function () {
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
    Engine.prototype.availableMoves = function (coordinate) {
        var square = this.getSquare(coordinate);
        return getMoves(coordinate, square.piece);
    };
    /**
     * @return boolean Returns true if the piece moved to the toSquare
     */
    Engine.prototype.movePieceTo = function (fromSquare, toSquare) {
        return false;
    };
    Engine.prototype.getSquare = function (square) {
        var x = square.rank;
        var y = square.file;
        if (!this.ranks[x])
            return null;
        return this.ranks[x].squares[y] || null;
    };
    return Engine;
})();
module.exports = Engine;
//# sourceMappingURL=engine.js.map