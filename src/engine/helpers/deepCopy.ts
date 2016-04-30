import BasePiece from '../basePiece';
import {
	BoardState,
	Rank,
	Move,
	MoveHistory
} from '../../types';

export default function deepCopy(boardState: BoardState) {

	var copy: BoardState = {
		ranks: boardState.ranks.map(copyRank),
		tags: shallowCopy(boardState.tags),
		moveNumber: boardState.moveNumber,
		whitesTurn: boardState.whitesTurn,
		capturedPieces: boardState.capturedPieces.slice(),
		preMoveFunctions: boardState.preMoveFunctions.slice(),
		postMoveFunctions: boardState.postMoveFunctions.slice(),
		moves: boardState.moves.slice(),
		moveHistory: boardState.moveHistory.slice(),
	}

	return copy;
}

function copyRank(rank: Rank) {
	var copy: Rank = {
		rank: rank.rank,
		squares: []
	}

	rank.squares.forEach((sq, i) => {
		copy.squares[i] = {
			rank: sq.rank,
			file: sq.file,
			piece: copyPiece(sq.piece),
			tags: shallowCopy(sq.tags),
		};
	});

	return copy;
}

type CopyableObject = {
	[index: string ]: any
}
function shallowCopy(object: CopyableObject) {
	var copy: any = {};
	if (!object) return copy;

	var keys = Object.keys(object);
	for (var x = 0; x < keys.length; x++) {
		var key = keys[x];
		copy[key] = object[key];
	}

	return copy;
}

function copyPiece(piece: BasePiece): BasePiece {
	if (!piece) return null;

	var copy: BasePiece = shallowCopy(piece);
	copy.location = { rank: piece.location.rank, file: piece.location.file };
	copy.movement = piece.movement;
	copy.getRelativeDestination = piece.getRelativeDestination;
	copy.getAbsoluteDestination = piece.getAbsoluteDestination;
	copy.postMoveFunctions = piece.postMoveFunctions;
	return copy;
}

function copyAvailableMoves(moves: Move[]) {
	function copyMove(move: Move): Move {
		return {
			from: shallowCopy(move.from),
			to: shallowCopy(move.to),
			postMoveActions: shallowCopyArray(move.postMoveActions),
			isWhite: move.isWhite
		};
	}
	var newMoves: Array<Move> = [];
	moves.forEach(m => newMoves.push(copyMove(m)));
	return newMoves;
}

function copyMoveHistory(history: MoveHistory[]) {
	function copyHistory(hist: MoveHistory): MoveHistory {
		return {
			from: shallowCopy(hist.from),
			to: shallowCopy(hist.to),
			piece: hist.piece
		};
	}
	var newHistory: Array<MoveHistory> = [];
	history.forEach(h => newHistory.push(copyHistory(h)));
	return newHistory;
}

function shallowCopyArray(array: any[]) {
	return array ? array.slice() : [];
}