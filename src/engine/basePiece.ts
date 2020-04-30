import {
	IPiece,
	Coordinate,
	Move,
	MoveFunction,
	MoveDefinition, BoardPiece
} from '../types';

export default class BasePiece implements BoardPiece {
	constructor(piece: IPiece, notation: string) {
		this.isWhite = notation === piece.notation.toUpperCase();
		this.name = piece.name;
		this.movement = piece.movement;
		this.canQueen = piece.canQueen;
		this.canSpawn = piece.canSpawn;
		this.value = piece.value;
		this.notation = notation;
		this.moveHistory = [];
		this.postMoveFunctions = piece.postMoveFunctions || [];
		this.location = {rank: 0, file: 0}
	}
	id = 0;
	location: Coordinate;
	name: string;
	movement: MoveDefinition[];
	canQueen: boolean;
	canSpawn: boolean;
	value: number;
	notation: string;
	moveHistory: Move[];
	isWhite: boolean;
	postMoveFunctions: MoveFunction[];

	getRelativeDestination(transform: Coordinate): Coordinate {
		return applyTransform(transform, this.location, this.isWhite);
	}

	getAbsoluteDestination(transform: Coordinate): Coordinate {
		return applyTransform(transform, this.location, true);
	}
}

function applyTransform(transform: Coordinate, position: Coordinate, isWhite: boolean) {
	const modifier = isWhite ? 1 : -1;
	return {
		file: position.file + (transform.file * modifier),
		rank: position.rank + (transform.rank * modifier)
	}
}
