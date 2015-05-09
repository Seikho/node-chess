var toString = require("./helpers/toString");
var getMoves = require("./helpers/getMoves");
var movePiece = require("./helpers/movePiece");
var fenParser = require("./parsers/fen");
var createSqaures = require("./helpers/createSquares");
var BasePiece = require("./basePiece");
/**
 * Board: extensible board (TODO: more detail)
 */
var Engine = (function () {
    function Engine(ranks, files) {
        this.ranks = [];
        this.pieces = [];
        this.positionParser = fenParser;
        this.capturedPieces = [];
        this.toString = toString;
        this.create = createSqaures;
        this.pieceFactory = BasePiece;
        this.availableMoves = getMoves;
        this.movePiece = movePiece;
        ranks = ranks || 8;
        files = files || 8;
        if (isNaN(ranks) || isNaN(files))
            throw "InvalidArgumentException: 'ranks' and 'files' must be a number";
        // Only accept positive, whole, organic, gluten-free numbers.
        this.rankCount = Math.floor(Math.abs(ranks));
        this.fileCount = Math.floor(Math.abs(files));
    }
    Engine.prototype.getSquare = function (square) {
        if (!this.ranks[square.rank])
            return null;
        return this.ranks[square.rank].squares[square.file] || null;
    };
    Engine.prototype.populateAvailableMoves = function () {
        var _this = this;
        this.ranks.forEach(function (rank) {
            rank.squares.forEach(function (square) {
                square.availableMoves = _this.availableMoves({ file: square.file, rank: rank.rank });
            });
        });
    };
    Engine.prototype.createPiece = function (notation) {
        var matchingPiece = this.pieces.filter(function (p) { return p.notation === notation.toLocaleLowerCase(); });
        if (matchingPiece.length === 0)
            return null;
        return new this.pieceFactory(matchingPiece[0], notation);
    };
    return Engine;
})();
module.exports = Engine;
//# sourceMappingURL=engine.js.map