import {
	MoveDefinition,
	IPiece,
	Coordinate,
	MoveCondition,
	MoveFunction,
	Square
} from '../../../types';
import Rook from './rook';

/**
 * King with castling support
 */

const up = makeMove(0, 1);
const down = makeMove(0, -1);
const left = makeMove(-1, 0);
const right = makeMove(1, 0);
const upLeft = makeMove(-1, 1);
const upRight = makeMove(1, 1);
const downLeft = makeMove(-1, -1);
const downRight = makeMove(1, -1);


const queenSideCastle: MoveDefinition = {
	canMove: true,
	transforms: { file: -2, rank: 0, absolute: true },
	preCondition: makeCastleMoveCondition({ file: -4, rank: 0 }),
	postMoveAction: postCastle({ file: -2, rank: 0 }, { file: 1, rank: 0 })
}


const kingSideCastle: MoveDefinition = {
	canMove: true,
	transforms: { file: 2, rank: 0, absolute: true },
	preCondition: makeCastleMoveCondition({ file: 3, rank: 0 }),
	postMoveAction: postCastle({ file: 1, rank: 0 }, { file: -1, rank: 0 })
}


function makeMove(file: number, rank: number): MoveDefinition {
	return {
		canCapture: true,
		canMove: true,
		transforms: { file, rank }
	}
}

function makeCastleMoveCondition(rookSquare: Coordinate): MoveCondition {
	return (piece, state, board) => {
		// King is not allowed to have moved
		const kingMoves = state.moveHistory.filter(moves => moves.piece.id === piece.id);
		if (kingMoves.length > 0) return false;

		// If the king isn't at 1,5 or 8,5...
		if ((piece.location.rank !== 1 && piece.location.rank !== 8)
			|| piece.location.file !== 5) return false;

		const coord = piece.getAbsoluteDestination(rookSquare);
		const square = board.getSquare(coord, state);

		// Piece must be a rook and the same colour..
		if (square == null) return false;
		if (square.piece == null) return false;
		if (square.piece.name !== Rook.name) return false;
		if (square.piece.isWhite !== piece.isWhite) return false;

		// Rook must not have moved
		const rookMoves = state.moveHistory.filter(move => square.piece && move.piece.id === square.piece.id);
		if (rookMoves.length > 0) return false;

		// All squares between the King and the Rook must be vacant
		const betweenSquares: Square[] = [];
		const increment = rookSquare.file > 0 ? 1 : -1;
		for (let x = increment; x !== rookSquare.file; x += increment) {
			const destination = piece.getAbsoluteDestination({ file: x, rank: 0 });
			betweenSquares.push(board.getSquare(destination, state));
		}

		const allVacant = betweenSquares.every(sq => sq.piece == null);
		return allVacant;
	}
}

function postCastle(rookSquare: Coordinate, rookDestination: Coordinate): MoveFunction {
	return {
		action: (piece, state, board) => {
			const oldRookSquare = board.getSquare(piece.getAbsoluteDestination(rookSquare), state);

			const newRookSquare = board.getSquare(piece.getAbsoluteDestination(rookDestination), state);

			newRookSquare.piece = oldRookSquare.piece;
			oldRookSquare.piece = null;
		}
	}
}

const king: IPiece = {
	notation: "k",
	name: "King",
	movement: [upLeft, upRight, downLeft, downRight, up, down, left, right, queenSideCastle, kingSideCastle],
	canQueen: false,
	canSpawn: false,
	value: 10,
	postMoveFunctions: []
}

export { king as default }
