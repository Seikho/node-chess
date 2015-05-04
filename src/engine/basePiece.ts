import pieceRules = require("./rules/piece");
export = BasePiece;
class BasePiece implements Chess.Piece {
	constructor(isWhite?: boolean) {
		this.isWhite = !!isWhite;
	}
	name: string = "";
	movement: Chess.MovePattern[] = [];
	canQueen: boolean = false;
	canSpawn: boolean = false;
	value: number = 0;
	notation: string = "";
	moveHistory: Chess.Move[] = [];
	conditionalMoves: Chess.ConditionalMovement[] = [];
	isWhite: boolean;
	 
	getConditionalMoves() {
		var movePatterns = [];
		this.conditionalMoves.forEach(move => {
			var patterns = move();
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