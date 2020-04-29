import {
	Piece,
	Coordinate,
	Move,
	MoveFunction,
	MoveDefinition
} from '../types';

export default class BasePiece {
	constructor(piece: Piece, notation: string) {
		this.isWhite = notation === piece.notation.toUpperCase();
		this.name = piece.name;
		this.movement = piece.movement;
		this.canQueen = piece.canQueen;
		this.canSpawn = piece.canSpawn;
		this.value = piece.value;
		this.notation = notation;
		this.moveHistory = [];
		this.postMoveFunctions = piece.postMoveFunctions || [];
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
		var destination = applyTransform(transform, this.location, this.isWhite);
		return destination;
	}

	getAbsoluteDestination(transform: Coordinate): Coordinate {
		var destination = applyTransform(transform, this.location, true);
		return destination;
	}
}

function applyTransform(transform: Coordinate, position: Coordinate, isWhite: boolean) {
	var modifier = isWhite ? 1 : -1;
	return {
		file: position.file + (transform.file * modifier),
		rank: position.rank + (transform.rank * modifier)
	}
}

function modifyTransform(transform: Coordinate, count: number) {
	return {
		file: transform.file * count,
		rank: transform.rank * count
	};
}
