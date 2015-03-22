/// <referece path="tsd.d.ts" />
declare module Chess {

	// From the perspective of the piece owner
	enum Direction {
		Up, Down, Left, Right
	}
}
/**
 * Defines a single move that a piece can perform
 */
interface PieceMovement {
	movePatterns: MovePattern[];
}

interface Coordinate {
	rank: number; // Board x-axis
	file: number; // Board y-axis
}

interface Rank {
	rank: number;
	squares: Square[];
}

interface Square {
	file: number;
	piece: Piece;
}

interface Piece {
	name: string;
	notation: string;
	movement: MovePattern;
	value: number; // Should the board determine the value of a piece?
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
}
/**
 * @param direction The direction of movement from the perspective of the piece owner
 * @param count Number of squares in the direction. 0: All squares (e.g. rooks, queens, bishops). Otherwise 1 .. N. SingleMoves with negative numbers are ignored.
 * */ 
interface SingleMove {
	direction: Chess.Direction;
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
	parse(position: string): any;
}
