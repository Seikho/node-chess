import Engine from '../../index';
import BasePiece from '../../basePiece';
import {
	MoveDefinition,
	Coordinate,
	BoardState,
	Piece
} from '../../../types';

var moveForward: MoveDefinition = {
	canMove: true,
	transforms: { file: 0, rank: 1 },
	postMoveAction: {
		action: (piece, state, board) => {
			var move = state.moveHistory.slice(-1)[0];
			if (move.to.rank !== 1 && move.to.rank !== 8) return;
			
			var promotionNotation = (<string>move.options || "q").toLowerCase();
			var promotionPiece = board.pieces.filter(p => p.notation === promotionNotation)[0];
			
			if (!promotionPiece) {
				promotionPiece = board.pieces.filter(p => p.notation === "q")[0];
			}
			
			piece.canQueen = false;
			piece.canSpawn = true;
			piece.movement = promotionPiece.movement;
			piece.notation = promotionPiece.notation;
			piece.postMoveFunctions = promotionPiece.postMoveFunctions;
			piece.value = promotionPiece.value;
			piece.name = promotionPiece.name;
		}
	}
}

var firstMove: MoveDefinition = {
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

var leftCapture: MoveDefinition = {
	canCapture: true,
	transforms: { file: 1, rank: 1 }
}

var rightCapture: MoveDefinition = {
	canCapture: true,
	transforms: { file: -1, rank: 1 }
}

var leftEnpassant: MoveDefinition = {
	canCapture: true,
	transforms: { file: -1, rank: 1 },
	preCondition: enpassantPreMove({ file: -1, rank: 1 }),
	postMoveAction: {
		action: enpassantPostMove
	}
}

var rightEnpassant: MoveDefinition = {
	canCapture: true,
	transforms: { file: 1, rank: 1 },
	preCondition: enpassantPreMove({ file: 1, rank: 1 }),
	postMoveAction: {
		action: enpassantPostMove
	}
}

function enpassantPreMove(dir: Coordinate) {
	return (piece: BasePiece, state: BoardState, board: Engine) => {
		var coord = piece.getRelativeDestination(dir);
		var sq = board.getSquare(coord, state);
		if (!sq) return false;
		return !!sq.tags["enpassant"];
	}
}

function enpassantPostMove(piece: BasePiece, state: BoardState, board: Engine) {
	var coord = piece.getRelativeDestination({ file: 0, rank: -1 });
	var square = board.getSquare(coord, state);
	state.capturedPieces.push(square.piece);
	square.piece = null;
}

var pawn: Piece = {
	notation: "p",
	name: "Pawn",
	movement: [moveForward, firstMove, leftCapture, rightCapture, leftEnpassant, rightEnpassant],
	canQueen: true,
	canSpawn: false,
	value: 1
}

export { pawn as default }