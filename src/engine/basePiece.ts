import Chess = require("node-chess");
import enums = require("../enums");
import Direction = enums.Direction;
export = BasePiece;

class BasePiece implements Chess.BasePiece {
	constructor(piece: Chess.Piece, notation: string) {
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
	location: Chess.Coordinate;
	name: string;
	movement: Chess.MoveDefinition[];
	canQueen: boolean;
	canSpawn: boolean;
	value: number;
	notation: string;
	moveHistory: Chess.Move[];
	isWhite: boolean;
	postMoveFunctions: Chess.MoveFunction[];

	getRelativeDestination(transform: Chess.Coordinate): Chess.Coordinate {		
		var destination = applyTransform(transform, this.location, this.isWhite);
		return destination;
	}
	
	getAbsoluteDestination(transform: Chess.Coordinate): Chess.Coordinate {
		var destination = applyTransform(transform, this.location, true);
		return destination;
	}
}

function applyTransform(transform: Chess.Coordinate, position: Chess.Coordinate, isWhite: boolean) {
	var modifier = isWhite ? 1 : -1;
	return {
		file: position.file + (transform.file * modifier),
		rank: position.rank + (transform.rank * modifier)
	}	
}

function modifyTransform(transform: Chess.Coordinate, count: number) {
	return {
		file: transform.file * count,
		rank: transform.rank * count
	};
}
