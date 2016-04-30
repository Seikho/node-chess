import BasePiece from './engine/basePiece';
import Engine from './engine';

export interface BoardState {
    ranks: Rank[];
    tags: BoardTag;
    moveNumber: number;
    whitesTurn: boolean;
    capturedPieces: Piece[];
    postMoveFunctions: MoveFunction[];
    preMoveFunctions: MoveFunction[];
    moves: Move[];
    winnerIsWhite?: boolean;
    gameIsDrawn?: boolean;
    moveHistory: MoveHistory[];
}

export interface BoardTag {
    [index: string]: any;
}

export interface MoveFunction {
    moveNumber?: number;
    action: (piece: BasePiece, boardState: BoardState, board: Engine) => any;
}

export interface Coordinate {
    file: number; // Board x-axis
    rank: number; // Board y-axis
    [axis: string]: number;
}

export interface Rank {
    rank: number;
    squares: Square[];
}

export interface Square {
    rank: number;
    file: number;
    piece: BasePiece;

    // TODO: Change to more strongly typed interface
    tags: any;
}

export interface Move {
    from: Coordinate;
    to: Coordinate;
    options?: any;
    postMoveActions?: MoveFunction[];
    isWhite?: boolean;
}

export interface MoveHistory {
    from: Coordinate;
    to: Coordinate;
    options?: any;
    piece: Piece;
}

export interface Piece {
    id?: number;
    location?: Coordinate;
    name: string;
    movement: MoveDefinition[];
    notation: string;
    value: number;
    canQueen: boolean;
    canSpawn: boolean;
    isWhite?: boolean;
    postMoveFunctions?: MoveFunction[];
}

export interface MoveDefinition {
    transforms?: Transform | Transform[];
    incrementer?: Increment;
    canMove?: boolean;
    canCapture?: boolean;
    postMoveAction?: MoveFunction;
    preCondition?: MoveCondition;
    postCondition?: MoveCondition;
    useDefaultConditions?: boolean;
}

export interface Increment {
    file: number,
    rank: number,
    absolute?: boolean; // TODO: Docs...
    limit?: number;
    canJump?: boolean
}

export interface Transform {
    file: number;
    rank: number;
    absolute?: boolean; // TODO: Docs...
    squaresBetween?: boolean;
    canJump?: boolean;
}

export interface MoveCondition {
    (piece: BasePiece, boardState: BoardState, board: Engine): boolean;
}

/**
 * @param direction The direction of movement from the perspective of the piece owner
 * @param count Number of squares in the direction. 0: All squares (e.g. rooks, queens, bishops). Otherwise 1 .. N. SingleMoves with negative numbers are ignored.
 * */
export interface SingleMove {
    direction: number;
    count: number;
}

/**
 * @param interval The callback frequency in milliseconds. 100ms default.
 * @param depth The maximum ply-depth that the analysis will reach. 5 by default.
 * @param time The maxmium calculation time. The engine will stop analysing the position after this time in seconds. 5s default.
 */
export interface AnalysisOptions {
    interval?: number;
    depth?: number;
    time?: number;
}

export interface PositionParser {
    (position?: string): void;
}

export interface StringParser {
    parse(position: string): BoardInput;
}

export interface BoardInput {
    ranks: string[];
    turn: string;
    castling: string[];
    halfMove: number;
    fullMove: number;
}

export interface Rule {
    (): boolean;
}