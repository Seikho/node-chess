import pieceRules = require("./rules/piece");
export = BaseFactory;
class BaseFactory {
	constructor(piece: Chess.Piece) {
		this.piece = piece;
		this.notation = piece.notation;
	}

	create(isWhite?: boolean): Chess.Piece {
		return {
			name: this.piece.name,
			movement: this.piece.movement,
			canQueen: this.piece.canQueen,
			canSpawn: this.piece.canSpawn,
			value: this.piece.value,
			isWhite: isWhite,
			notation: this.notation,
			moveHistory: []
		}
	}

	piece: Chess.Piece;
	notation: string;
	rules = pieceRules;
}
