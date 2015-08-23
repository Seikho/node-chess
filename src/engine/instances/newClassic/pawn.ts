import Chess = require("node-chess");
import Dir = Chess.Direction;

var moveForward: Chess.MoveDefinition = {
	canMove: true,
	transforms: { file: 0, rank: 1 }
}

var firstMove: Chess.MoveDefinition = {
	canMove: true,
	transforms: { file: 0, rank: 2 },
	preCondition: (piece, boardState) => boardState.moveHistory.filter(m => m.piece.id === piece.id).length === 0
}

var leftCapture: Chess.MoveDefinition = {
	canCapture: true,
	transforms: { file: 1, rank: 1 }
}

var rightCapture: Chess.MoveDefinition = {
	canCapture: true,
	transforms: { file: -1, rank: 1 }
}

var leftEnpassant: Chess.MoveDefinition = {
	canCapture: true,
	transforms: { file: -1, rank: 1 },
	preCondition: enpassantPreMove(Dir.UpLeft),
	postMoveAction: {
		action: enpassantPostMove(Dir.Left)
	}
}

var rightEnpassant: Chess.MoveDefinition = {
	canCapture: true,
	transforms: { file: 1, rank: 1 },
	preCondition: enpassantPreMove(Dir.UpRight),
	postMoveAction: {
		action: enpassantPostMove(Dir.Right)
	}
}

function enpassantPreMove(dir: Dir) {
	return (piece: Chess.BasePiece, state: Chess.BoardState, board: Chess.Engine) => {
		var coord = piece.getRelativeDestinations(dir, 1);
		var sq = board.getSquare(coord[0], state);
		if (!sq) return false;
		return !!sq.tags["enpassant"];
	}
}

function enpassantPostMove(dir: Dir) {
	return (piece: Chess.BasePiece, state: Chess.BoardState, board: Chess.Engine) => {
		var coord = piece.getRelativeDestinations(dir, 1);
		var square = board.getSquare(coord[0], state);
		state.capturedPieces.push(square.piece);
		square.piece = null;
	}
}