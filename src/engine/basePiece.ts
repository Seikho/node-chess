import getTransforms = require("./helpers/getTransforms");
import applyTransform = require("./helpers/applyTransform");
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
	location: Chess.Coordinate;
	name: string;
	movement: Chess.MovePattern[];
	canQueen: boolean;
	canSpawn: boolean;
	value: number;
	notation: string;
	moveHistory: Chess.Move[];
	isWhite: boolean;
	postMoveFunctions: Chess.PostMoveFunction[];
	 
	getRelativeDestinations(direction: Chess.Direction, count: number): Chess.Coordinate[] {
		var transforms = getTransforms({ direction: direction, count: count }, this.isWhite);
		
		var destinations = transforms.map(transform => applyTransform(this.location, transform));
		return destinations;
	}
}