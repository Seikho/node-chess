import Chess = require("node-chess");
import toString = require("./helpers/toString");
import getMoves = require("./helpers/getMoves");
import movePiece = require("./helpers/movePiece");
import fenParser = require("./parsers/fen")
import createSqaures = require("./helpers/createSquares");
import BasePiece = require("./basePiece");
export = Engine;

/**
 * Board: extensible board (TODO: more detail)
 */
class Engine implements Chess.Engine {
    constructor(ranks?: number, files?: number) {
        ranks = ranks || 8;
        files = files || 8;
        if (isNaN(ranks) || isNaN(files)) throw "InvalidArgumentException: 'ranks' and 'files' must be a number";

        // Only accept positive, whole, organic, gluten-free numbers.
        this.rankCount = Math.floor(ranks);
        this.fileCount = Math.floor(files);
    }
    rankCount: number;
    fileCount: number;
    moveNumber: number = 1;
    whitesTurn: boolean;

    ranks = [];
    pieces = [];
    capturedPieces = [];
    postMoveFunctions = [];

    positionParser = fenParser;
    toString = toString;
    create = createSqaures;
    pieceFactory = BasePiece;
    availableMoves = getMoves;
    movePiece = movePiece;
	preMoveActions = [];
    postMoveActions = [];
	tags = {};

    getSquare(square: Chess.Coordinate): Chess.Square {
        if (!this.ranks[square.rank]) return null;
        return this.ranks[square.rank].squares[square.file] || null;
    }

    populateAvailableMoves(): void {
        this.ranks.forEach(rank => {
            rank.squares.forEach(square => {
                square.availableMoves = this.availableMoves({ file: square.file, rank: rank.rank });
            });
        });
    }

    createPiece(notation: string, location: Chess.Coordinate): Chess.BasePiece {
        var matchingPiece = this.pieces.filter(p => p.notation === notation.toLocaleLowerCase());
        if (matchingPiece.length === 0) return null;
        var newPiece = new this.pieceFactory(matchingPiece[0], notation);
        newPiece.location = location;
        return newPiece;
    }
}
