import pieceRules = require("./rules/piece");
export = BasePiece;
class BasePiece implements Chess.Piece {
	name: string = "";
	movement: Chess.MovePattern[] = [];
	canQueen: boolean = false;
	canSpawn: boolean = false;
	value: number = 0;
	notation: string = "";
	moveHistory: Chess.Move[] = [];
	conditionalMoves: Chess.ConditionalMovement[] = [];
	 
	getConditionalMoves() {
		var movePatterns = [];
		this.conditionalMoves.forEach(move => {
			var patterns = move();
			if (!patterns) return;
			movePatterns = movePatterns.concat(patterns);
		});
		return movePatterns;
	}
}