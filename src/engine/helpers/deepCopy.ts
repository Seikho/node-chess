import BasePiece from '../basePiece';
import {
	BoardState,
	Rank
} from '../../types';

/**
 * Deep copies board state, ensures current & previous board state(s) are independent of each other
 * Can use R or Lodash instead..
 *
 * @param boardState
 */
export default function deepCopy(boardState: BoardState) {

	const copy: BoardState = {
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

/**
 * Copies one row on the board, the row contains x,y position, piece, and arbitrary tags
 * @param rank
 */
function copyRank(rank: Rank) {
	const copy: Rank = {
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

/**
 * Shallow copies the tags object
 * @param object
 */
function shallowCopy(object: {[index: string ]: any}) {
	const copy: any = {};
	if (!object) return copy;

	const keys = Object.keys(object);
	for (let x = 0; x < keys.length; x++) {
		const key = keys[x];
		copy[key] = object[key];
	}

	return copy;
}

/**
 * Copies a Piece, returns null if piece not found
 * @param piece
 */
function copyPiece(piece: BasePiece | null): BasePiece | null {
	if (!piece) return null;

	const copy: BasePiece = shallowCopy(piece);
	copy.location = { rank: piece.location.rank, file: piece.location.file };
	copy.movement = piece.movement;
	copy.getRelativeDestination = piece.getRelativeDestination;
	copy.getAbsoluteDestination = piece.getAbsoluteDestination;
	copy.postMoveFunctions = piece.postMoveFunctions;
	return copy;
}
