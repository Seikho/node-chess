declare module Chess {
    interface Engine {
    	rankCount: number;
    	fileCount: number;
    	ranks: Rank[];
    	pieces: Piece[];
    	positionParser: PositionParser;
    	capturedPieces: Piece[];
    	create(): void;
    	availableMoves(coordinate: Coordinate): Coordinate[];
        populateAvailableMoves();
    	getSquare(square: Coordinate): Square;
        movePiece(from: Coordinate, to: Coordinate): boolean;
    	toString(): string;
        whitesTurn: boolean;
        createPiece(notation: string, location: Coordinate): Chess.Piece;
    }

    /**
     * Defines a single move that a piece can perform
     */
    interface PieceMovement {
    	movePatterns: MovePattern[];
    }
    
    interface ConditionalMovement {
        (piece: Piece, board: Engine): MovePattern|MovePattern[];
    }
    
    interface PostMoveFunction {
        (piece: Piece, board: Engine): void;
    }

    interface Coordinate {
    	file: number; // Board x-axis
    	rank: number; // Board y-axis
    }

    interface Rank {
    	rank: number;
    	squares: Square[];
    }

    interface Square {
    	file: number;
    	piece: Piece;
        availableMoves?: Coordinate[];
        tags: string[];
    }
    
    interface Move {
        from: Coordinate;
        to: Coordinate;
    }

    interface Piece {
        location: Coordinate;
    	name: string;
    	movement: MovePattern[];
    	notation: string;
    	value: number;
    	canQueen: boolean;
    	canSpawn: boolean;
    	isWhite?: boolean;
        moveHistory?: Move[];
        conditionalMoves?: ConditionalMovement[];
        getConditionalMoves?: (board: Engine) => MovePattern[];
    }

    /**
     * @param moves The complete pattern of movement
     * @param canJump Can the piece jump over pieces to reach the location
     * @param canMove Can the piece move there without capturing
     * @param canCapture Can the piece capture at the location
     */
    interface MovePattern {
    	moves: SingleMove[];
    	canJump?: boolean;
    	canCapture?: boolean;
    	canMove?: boolean;
        postMoveActions?: PostMoveFunction[];
    }
    
    /**
     * @param direction The direction of movement from the perspective of the piece owner
     * @param count Number of squares in the direction. 0: All squares (e.g. rooks, queens, bishops). Otherwise 1 .. N. SingleMoves with negative numbers are ignored.
     * */
    interface SingleMove {
    	direction: number;
    	count: number;
    }

    /**
     * @param interval The callback frequency in milliseconds. 100ms default.
     * @param depth The maximum ply-depth that the analysis will reach. 5 by default.
     * @param time The maxmium calculation time. The engine will stop analysing the position after this time in seconds. 5s default.
     */
    interface AnalysisOptions {
    	interval?: number;
    	depth?: number;
    	time?: number;
    }

    interface PositionParser {
    	(position?: string): void;
    }

    interface StringParser {
    	parse(position: string): BoardInput;
    }

    interface BoardInput {
    	ranks: string[];
    	turn: string;
    	castling: string[];
    	halfMove: number;
    	fullMove: number;
    }

    interface Rule {
    	(): boolean;
    }
}
