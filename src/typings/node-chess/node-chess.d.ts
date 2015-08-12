declare module "node-chess" {
    export interface Engine {
        rankCount: number;
        fileCount: number;

        boardState: BoardState;

        pieces: Piece[];
        positionParser: PositionParser;
        create(): void;
        getMoves(coordinate: Coordinate, boardState?: BoardState): Move[];
        populateAvailableMoves(boardState: BoardState);
        getSquare(square: Coordinate, boardState?: BoardState): Square;
        movePiece(from: Coordinate, to: Coordinate, boardState?: BoardState): BoardState;
        createPiece(notation: string, location: Coordinate): BasePiece;
        toString(): string;

    }
    
    export interface BoardState {
        ranks: Rank[];
        tags: BoardTag;
        moveNumber: number;
        whitesTurn: boolean;
        capturedPieces: Piece[];
        postMoveFunctions: MoveFunction[];
        preMoveFunctions: MoveFunction[];
        moves: Move[];
    }
    
    export interface BoardTag {
        [index: string]: any;
    }

    export enum Direction {
        Up,
        Down,
        Left,
        Right,
        DiagonalUp,
        DiagonalDown,
        Lateral,
        Horizontal,
        Vertical,
        Diagonal,
        UpLeft,
        UpRight,
        DownLeft,
        DownRight,
        KingSide,
        QueenSide
    }

    /**
     * Defines a single move that a piece can perform
     */
    export interface PieceMovement {
        movePatterns: MovePattern[];
    }

    export interface MoveFunction {
        moveNumber?: number;
        action: (piece: BasePiece, boardState: BoardState, board: Engine) => any;
    }

    export interface Coordinate {
        file: number; // Board x-axis
        rank: number; // Board y-axis
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
        from?: Coordinate;
        to: Coordinate;
        postMoveActions?: MoveFunction[];
        isWhite: boolean;
    }

    export interface Piece {
        location: Coordinate;
        name: string;
        movement: MovePattern[];
        notation: string;
        value: number;
        canQueen: boolean;
        canSpawn: boolean;
        isWhite?: boolean;
        moveHistory?: Move[];
        getConditionalMovePatterns?: (board: Engine) => MovePattern[];
        postMoveFunctions?: MoveFunction[];
    }

    export interface BasePiece extends Piece {
        getRelativeDestinations: (direction: number, count: number) => Coordinate[];
        postMoveFunctions: MoveFunction[];
    }

    /**
     * @param moves The complete pattern of movement
     * @param canJump Can the piece jump over pieces to reach the location
     * @param canMove Can the piece move there without capturing
     * @param canCapture Can the piece capture at the location
     */
    export interface MovePattern {
        moves: SingleMove[];
        canJump?: boolean;
        canCapture?: boolean;
        canMove?: boolean;
        postMoveActions?: MoveFunction[];
        conditions?: MovePatternConditional[];
        useDefaultConditions?: boolean;
    }

    export interface MovePatternConditional {
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
}

