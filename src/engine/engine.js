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
        this.positionParser = fenParser;
        this.capturedPieces = [];
        this.toString = toString;
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
    Engine.prototype.movePiece = function (move) {
        var origin = this.getSquare(move.from);
        if (!origin || !origin.piece)
            return false;
        // The 'destination' square must be in the square's list of available moves
        if (!origin.availableMoves.some(function (availableMove) { return availableMove.file === move.to.file && availableMove.rank === move.to.rank; }))
            return false;
        var destination = this.getSquare(move.to);
        if (destination.piece)
            this.capturedPieces.push(destination.piece);
        origin.piece.moveHistory.push(move);
        this.ranks[move.to.rank].squares[move.to.file] = {
            availableMoves: [],
            piece: origin.piece,
            file: move.to.file
        };
        this.ranks[move.from.rank].squares[move.from.file] = {
            availableMoves: [],
            piece: null,
            file: move.from.file
        };
        this.populateAvailableMoves();
        return true;
    };
    return Engine;
})();
module.exports = Engine;
//# sourceMappingURL=engine.js.map