import Chess = require("node-chess");
export = pawn;

var moveForward: Chess.MoveDefinition = {
	canMove: true,
	transforms: { file: 0, rank: 1 }
}

var firstMove: Chess.MoveDefinition = {
	canMove: true,
	transforms: { file: 0, rank: 2 },
	preCondition: (piece, boardState) => boardState.moveHistory.filter(m => m.piece.id === piece.id).length === 0,
	postMoveAction: {
		action: (piece, state, board) => {
			var coordBehindPawn = piece.getRelativeDestination({ file: 0, rank: -1 })
			var squareBehindPawn = board.getSquare(coordBehindPawn, state);
			squareBehindPawn.tags["enpassant"] = true;
			
			state.postMoveFunctions.push({
				moveNumber: state.moveNumber+1,
				action: (piece, innerState, innerBoard) => {
					var sq = innerBoard.getSquare({file: coordBehindPawn.file, rank: coordBehindPawn.rank }, innerState);
					delete sq.tags["enpassant"];
				}
			})
		}
	}
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
	preCondition: enpassantPreMove({ file: -1, rank: 1 }),
	postMoveAction: {
		action: enpassantPostMove
	}
}

var rightEnpassant: Chess.MoveDefinition = {
	canCapture: true,
	transforms: { file: 1, rank: 1 },
	preCondition: enpassantPreMove({ file: 1, rank: 1 }),
	postMoveAction: {
		action: enpassantPostMove
	}
}

function enpassantPreMove(dir: Chess.Coordinate) {
	return (piece: Chess.BasePiece, state: Chess.BoardState, board: Chess.Engine) => {
		var coord = piece.getRelativeDestination(dir);
		var sq = board.getSquare(coord, state);
		if (!sq) return false;
		return !!sq.tags["enpassant"];
	}
}

function enpassantPostMove(piece: Chess.BasePiece, state: Chess.BoardState, board: Chess.Engine) {
	var coord = piece.getRelativeDestination({ file: 0, rank: -1 });
	var square = board.getSquare(coord, state);
	state.capturedPieces.push(square.piece);
	square.piece = null;
}

var pawn: Chess.Piece = {
	notation: "p",
	name: "Pawn",
	movement: [moveForward, firstMove, leftCapture, rightCapture, leftEnpassant, rightEnpassant],
	canQueen: true,
	canSpawn: false,
	value: 1
}