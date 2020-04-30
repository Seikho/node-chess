import {
    MoveFunction,
    BoardPiece,
    BoardState,
    BoardTag, IPiece,
} from '../types';
import toString from './helpers/toString';
import getMoves from './helpers/getMoves';
import inferMoves from './helpers/inferMoves';
import movePiece, {calculateMovePiece} from './helpers/movePiece';
import fenParser from './parsers/fen';
import createSquares from './helpers/createSquares';
import BasePiece from './basePiece';
import availableMoves from './helpers/availableMoves';
import getSquare from './helpers/getSquare';
import createPiece from './helpers/createPiece';

/**
 * Board: extensible board (TODO: more detail)
 */
export default class Engine {
    constructor() { }

    uciEngine: UCIEngine | null = null;
    rankCount: number = 8;
    fileCount: number = 8;
    postMoveFunctions: MoveFunction[] = [];

    boardState: BoardState = {
        ranks: [],
        tags: <BoardTag>{},
        capturedPieces: [],
        whitesTurn: true,
        moveNumber: 1,
        preMoveFunctions: [],
        postMoveFunctions: [],
        moves: [],
        moveHistory: []
    }

    pieces: IPiece[] = [];
    pieceFactory = BasePiece;

    positionParser = fenParser.bind(this);

    movePiece = movePiece.bind(this);
    calculateMovePiece = calculateMovePiece.bind(this);

    getSquare = getSquare.bind(this);
    getMoves = getMoves.bind(this);

    create = createSquares.bind(this);
    inferMoves = inferMoves.bind(this);
    toString = toString.bind(this);

    populateAvailableMoves = availableMoves.bind(this);
    createPiece = createPiece.bind(this);

    analyzer = (uciEngine: UCIEngine) => {
        this.uciEngine = uciEngine;
    }
}

interface UCIEngine {
    postMessage: (command: string) => void;
    onmessage: (event: UCIEvent) => void;
}

interface UCIEvent {
    data: string;
}

