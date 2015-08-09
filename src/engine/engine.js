var toString = require("./helpers/toString");
var getMoves = require("./helpers/getMoves");
var movePiece = require("./helpers/movePiece");
var fenParser = require("./parsers/fen");
var createSqaures = require("./helpers/createSquares");
var BasePiece = require("./basePiece");
var availableMoves = require("./helpers/availableMoves");
var getSquare = require("./helpers/getSquare");
var createPiece = require("./helpers/createPiece");
/**
 * Board: extensible board (TODO: more detail)
 */
var Engine = (function () {
    function Engine(ranks, files) {
        this.boardState = {
            ranks: [],
            tags: {},
            capturedPieces: [],
            whitesTurn: true,
            moveNumber: 1,
            preMoveFunctions: [],
            postMoveFunctions: []
        };
        this.pieces = [];
        this.positionParser = fenParser.bind(this);
        this.toString = toString.bind(this);
        this.create = createSqaures.bind(this);
        this.pieceFactory = BasePiece;
        this.availableMoves = getMoves.bind(this);
        this.movePiece = movePiece.bind(this);
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
module.exports = Engine;
//# sourceMappingURL=engine.js.map