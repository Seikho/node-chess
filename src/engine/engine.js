var toString = require("./helpers/toString");
var getMoves = require("./helpers/getMoves");
var inferMoves = require("./helpers/inferMoves");
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
    function Engine() {
        this.rankCount = 8;
        this.fileCount = 8;
        this.postMoveFunctions = [];
        this.boardState = {
            ranks: [],
            tags: {},
            capturedPieces: [],
            whitesTurn: true,
            moveNumber: 1,
            preMoveFunctions: [],
            postMoveFunctions: [],
            moves: [],
            moveHistory: []
        };
        this.pieces = [];
        this.positionParser = fenParser.bind(this);
        this.movePiece = movePiece.bind(this);
        this.getSquare = getSquare.bind(this);
        this.getMoves = getMoves.bind(this);
        this.create = createSqaures.bind(this);
        this.inferMoves = inferMoves.bind(this);
        this.toString = toString.bind(this);
        this.pieceFactory = BasePiece;
        this.populateAvailableMoves = availableMoves.bind(this);
        this.createPiece = createPiece.bind(this);
    }
    return Engine;
})();
module.exports = Engine;
//# sourceMappingURL=engine.js.map