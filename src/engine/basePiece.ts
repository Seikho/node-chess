import Chess = require("node-chess");
import getTransforms = require("./helpers/getTransforms");
import applyTransform = require("./helpers/applyTransform");
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
		
		// Optimisation: Caching evaluated MovePatterns
		piece.movement.forEach(move => {
			var pattern = {
				canJump: move.canJump,
				canMove: move.canMove,
				canCapture: move.canCapture,
				moves: null
			}
			move.moves.forEach(m => {
				var moves = getTransforms(m, this.isWhite);
				this.transformCache.push({ moves, pattern })
			});			
		});
	}
	id = 0;
	location: Chess.Coordinate;
	name: string;
	movement: Chess.MovePattern[];
	canQueen: boolean;
	canSpawn: boolean;
	value: number;
	notation: string;
	moveHistory: Chess.Move[];
	transformCache: Array<{ moves: Chess.Coordinate[], pattern: Chess.MovePattern }> = [];
	isWhite: boolean;
	postMoveFunctions: Chess.MoveFunction[];

	getRelativeDestinations(direction: Direction, count: number): Chess.Coordinate[] {
		var transforms = getTransforms({ direction: direction, count: 0 }, this.isWhite);
		var appliedTransforms = transforms.map(t => modifyTransform(t, count));
		var destinations = appliedTransforms.map(transform => applyTransform(this.location, transform));
		return destinations;
	}
}

function modifyTransform(transform: Chess.Coordinate, count: number) {
	return {
		file: transform.file * count,
		rank: transform.rank * count
	};
}
