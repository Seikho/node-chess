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
        this.moveNumber = 1;
        this.ranks = [];
        this.pieces = [];
        this.capturedPieces = [];
        this.postMoveFunctions = [];
        this.positionParser = fenParser.bind(this);
        this.toString = toString.bind(this);
        this.create = createSqaures.bind(this);
        this.pieceFactory = BasePiece;
        this.availableMoves = getMoves.bind(this);
        this.movePiece = movePiece.bind(this);
        this.preMoveActions = [];
        this.postMoveActions = [];
        this.tags = {};
        this.getSquare = getSquare.bind(this);
        this.populateAvailableMoves = availableMoves.bind(this);
        this.createPiece = createPiece.bind(this);
        ranks = ranks || 8;
        files = files || 8;
        if (isNaN(ranks) || isNaN(files))
            throw "InvalidArgumentException: 'ranks' and 'files' must be a number";
        // Only accept positive, whole, organic, gluten-free numbers.
        this.rankCount = Math.floor(ranks);
        this.fileCount = Math.floor(files);
    }
    return Engine;
})();
function getSquare(square) {
    if (!this.ranks[square.rank])
        return null;
    return this.ranks[square.rank].squares[square.file] || null;
}
function availableMoves() {
    var _this = this;
    this.ranks.forEach(function (rank) {
        rank.squares.forEach(function (square) {
            square.availableMoves = _this.availableMoves({ file: square.file, rank: rank.rank });
        });
    });
}
module.exports = Engine;
//# sourceMappingURL=engine.js.map