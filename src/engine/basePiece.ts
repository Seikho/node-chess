import pieceRules = require("./rules/piece");
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
	name: string;
	movement: Chess.MovePattern[];
	canQueen: boolean;
	canSpawn: boolean;
	value: number;
	notation: string;
	moveHistory: Chess.Move[];
	conditionalMoves: Chess.ConditionalMovement[];
	isWhite: boolean;
	 
	getConditionalMoves() {
		var movePatterns = [];
		
		this.conditionalMoves.forEach(move => {
			var patterns = move(this);
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
}