/// <reference path="typings/internal.d.ts" />
export enum Direction {
	Up, Down, Left, Right, DiagonalUp, DiagonalDown, Lateral, Horizontal, Vertical, Diagonal
}
/**
 * Defines a single move that a piece can perform
 */
export interface PieceMovement {
	movePatterns: MovePattern[];
}

export interface Coordinate {
	rank: number; // Board x-axis
    file: number; // Board y-axis
}

export interface Rank {
	rank: number;
	squares: Square[];
}

export interface Square {
	file: number;
	piece: Piece
;}

export class PieceFactory {
	constructor(piece: Piece, notation: string) {
		this.piece = piece;
		this.notation = notation.slice(0,1).toLowerCase();
	}

	create(isWhite?: boolean): Piece {
		return {
			name: this.piece.name,
			movement: this.piece.movement,
			canQueen: this.piece.canQueen,
			canSpawn: this.piece.canSpawn,
			value: this.piece.value,
			isWhite: !!isWhite
		}
	}

	piece: Piece;
	notation: string;
}

export interface Piece {
	name: string;
	movement: MovePattern[];
	value: number;
	canQueen: boolean;
	canSpawn: boolean;
	isWhite?: boolean;
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
}
/**
 * @param direction The direction of movement from the perspective of the piece owner
 * @param count Number of squares in the direction. 0: All squares (e.g. rooks, queens, bishops). Otherwise 1 .. N. SingleMoves with negative numbers are ignored.
 * */ 
export interface SingleMove {
	direction: Direction;
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
	parse(position: string): any;
}

