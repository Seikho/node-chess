var toString = require("./helpers/toString");
var getMoves = require("./helpers/getMoves");
var fenParser = require("./parsers/fen");
var createSqaures = require("./helpers/createSquares");
/**
 * Board: extensible board (TODO: more detail)
 */
var Engine = (function () {
    function Engine(ranks, files) {
        this.ranks = [];
        this.pieces = [];
        this.create = createSqaures;
        /**
         * Returns an array of the available squares a piece can move to
         */
        this.availableMoves = getMoves;
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