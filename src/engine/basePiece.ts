import getTransforms = require("./helpers/getTransforms");
import applyTransform = require("./helpers/applyTransform");
import Direction = require("../direction");
export = BasePiece;

class BasePiece implements Chess.Piece {
	constructor(piece: Chess.Piece, notation: string) {
		this.isWhite = notation === piece.notation.toUpperCase();
		this.name = piece.name;
		this.movement = piece.movement;
		this.canQueen = piece.canQueen;
		this.canSpawn = piece.canSpawn;
		this.value = piece.value;
		this.notation = notation;
		this.conditionalMoves = piece.conditionalMoves || [];
		this.moveHistory = [];
	}
	location: Chess.Coordinate;
	name: string;
	movement: Chess.MovePattern[];
	canQueen: boolean;
	canSpawn: boolean;
	value: number;
	notation: string;
	moveHistory: Chess.Move[];
	conditionalMoves: Chess.ConditionalMovement[];
	isWhite: boolean;
	 
	getConditionalMoves(board: Chess.Engine) {
		var movePatterns = [];
		
		this.conditionalMoves.forEach(move => {
			var patterns = move.action(this, board);
			if (!patterns) return;
			movePatterns = movePatterns.concat(patterns);
		});
		return movePatterns;
	}
	
	makeConditionalMove(condition: () => boolean, patterns: Chess.MovePattern|Chess.MovePattern[]) {
		return () => {
			if (condition()) return patterns;
		};
	}
	
	getRelativeDestinations(direction: Direction, count: number): Chess.Coordinate[] {
		var transforms = getTransforms({ direction: direction, count: count }, this.isWhite);
		
		var destinations = transforms.map(transform => applyTransform(this.location, transform));
		return destinations;
	}
}