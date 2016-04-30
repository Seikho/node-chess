import Engine from '../index';
import BasePiece from '../basePiece';
import {
	BoardState,
	Move,
	MoveDefinition,
	Transform,
	Piece,
	Coordinate
} from '../../types';
/**
 * Intentionally not using any closures to improve performance
 * This code can potentially be called thousands of times after a single move has been played
 */
export default function infer(this: Engine, piece: BasePiece, state?: BoardState) {	
	state = state || this.boardState;
	var moves: Move[] = [];

	for (var key in piece.movement) {
		var move = piece.movement[key];

		var canProcess = true;
		if (move.preCondition)
			canProcess = move.preCondition(piece, state, this);

		if (move.transforms) {
			// Pre-conditions only apply to 
			if (!canProcess) continue;

			var newMove = processTransform(move, piece, state, this);
			if (newMove) moves.push(newMove);
		}
		else {
			var newMoves = processIncrementer(move, piece, state, this);

			if (move.postMoveAction) {
				for (var x = 0; x < newMoves.length; x++) {
					newMoves[x].postMoveActions = [move.postMoveAction]
				}
			}

			moves = moves.concat(newMoves);
		};
	}

	return moves;
}

function processTransform(move: MoveDefinition, piece: Piece, boardState: BoardState, board: Engine) {

	var modifier = piece.isWhite ? 1 : -1;
	var finalMove: Move = {
		from: copyCoord(piece.location),
		to: null,
		isWhite: piece.isWhite
	};

	var canSkipLogic = move.preCondition && !move.useDefaultConditions;

	if (move.postMoveAction)
		finalMove.postMoveActions = [move.postMoveAction];

	var steps = [piece.location];
	var transforms = <Transform[]>move.transforms;

	if (!Array.isArray(transforms)) transforms = <any>[transforms];

	for (var x = 0; x < transforms.length; x++) {
		var transform = transforms[x];
		var appliedTransform = applyTransform(steps[x], transform, modifier);
		if (!isInBounds(appliedTransform)) return null;
		
		steps.push(appliedTransform);
	}

	var finalCoord = steps[steps.length - 1];
	finalMove.to = finalCoord;
	
	// Pre-condition has passed and useDefaultConditions is false.
	if (canSkipLogic) return finalMove;

	var finalSquare = board.getSquare(finalCoord, boardState);
	if (!finalSquare) return null;
	var finalSquarePiece = finalSquare.piece;

	var canCaptureOnFinalSquare = move.canCapture && finalSquarePiece && finalSquarePiece.isWhite != piece.isWhite;
	if (canCaptureOnFinalSquare) return finalMove;

	var canMoveButSquareOccupied = move.canMove && finalSquarePiece;
	if (canMoveButSquareOccupied) return null;

	for (var x = 1; x < steps.length; x++) {
		var prev = steps[x - 1];
		var step = steps[x];
		var transform = transforms[x - 1];

		if (step !== finalCoord) {
			//TODO: Allow 'squaresBetween' here			
			if (transform.canJump) continue;

			if (transform.squaresBetween) {
				var canMove = checkBetween(
					prev,
					step,
					piece,
					transform,
					boardState,
					board);

				if (!canMove) return null;
			}

			continue;
		}

		// Logic when analyzing the final step in a MoveDefintion
		
		// If we can jump, don't checkBetween
		if (transform.canJump) return finalMove;

		if (transform.squaresBetween) {
			var canMove = checkBetween(
				prev,
				step,
				piece,
				transform,
				boardState,
				board);

			if (!canMove) return finalMove;
		}

		var isFinalSquareVacant = finalSquare.piece == null;
		if (move.canMove && isFinalSquareVacant)
			return finalMove;

		var isFinalSquareOccupiedByEnemy = finalSquare.piece && finalSquare.piece.isWhite !== piece.isWhite;
		if (move.canCapture && isFinalSquareOccupiedByEnemy) return finalMove;
	}

	return null;
}

function processIncrementer(move: MoveDefinition, piece: Piece, state: BoardState, board: Engine): Move[] {
	var current = { file: piece.location.file, rank: piece.location.rank };
	var modifier = piece.isWhite || move.incrementer.absolute ? 1 : -1;

	var file = move.incrementer.file * modifier;
	var rank = move.incrementer.rank * modifier;
	var validMoves: Move[] = [];

	while (true) {
		current.file += file;
		current.rank += rank;
		if (!isInBounds(current)) break;
		var square = board.getSquare(current, state);

		if (square.piece) {
			if (square.piece.isWhite !== piece.isWhite) {
				if (!move.canCapture && !move.incrementer.canJump) break;

				validMoves.push({ from: copyCoord(piece.location), to: { file: current.file, rank: current.rank }, isWhite: piece.isWhite });
				
				// If we can jump, we can possibly go to the next square, otherwise terminate the incrementer here.
				if (move.incrementer.canJump) continue;
				else break;
			}

			if (square.piece.isWhite === piece.isWhite) {
				if (!move.incrementer.canJump) break;
				
				// Do not add the move here: we can jump, but we can't move to this square
				//validMoves.push({ from: copyCoord(piece.location), to: { file: current.file, rank: current.rank }, isWhite: piece.isWhite });
				continue;
			}

			if (move.canCapture) {
				validMoves.push({ from: copyCoord(piece.location), to: { file: current.file, rank: current.rank }, isWhite: piece.isWhite });
				continue;
			}

			break;
		}

		if (move.canMove) {
			validMoves.push({ from: copyCoord(piece.location), to: { file: current.file, rank: current.rank }, isWhite: piece.isWhite });
			continue;
		}

		break;
	}

	return validMoves;
}

function isInBounds(position: Coordinate): boolean {
	return position.file > 0 && position.file <= 8
		&& position.rank > 0 && position.rank <= 8;
}

// TODO: Shrink function signature. Take an object instead
function checkBetween(start: Coordinate, end: Coordinate, piece: Piece, transform: Transform, boardState: BoardState, board: Engine) {
	var difference = {
		file: Math.abs(start.file - end.file),
		rank: Math.abs(start.rank - end.rank)
	};
	
	// If 
	if (difference.file > 0 && difference.rank > 0)
		throw new Error(`Invalid non-jumpable move in ${piece.name} definition: ${transform}`);

	if (difference.file === 1 || difference.rank === 1) return false;

	var dimension = difference.file > 0 ? "file" : "rank";
	var inc = end[dimension] > start[dimension] ? -1 : 1;
			
	// Ensure all squares between current and previous are vacant
	// Avoid closures to avoid heap allocations
	for (var y = end[dimension]; y !== start[dimension]; y += inc) {
		var between: Coordinate = { file: end.file, rank: end.rank };
		between[dimension] += inc;
		var sq = board.getSquare(between, boardState);
				
		// If a square is occupied, the move is not valid
		if (sq.piece) return false;
	}
			
	// All squares are vacant
	return true;
}

function applyTransform(coordinate: Coordinate, transform: Transform, modifier: number) {
	if (transform.absolute) modifier = 1;

	var file = coordinate.file + (transform.file * modifier);
	var rank = coordinate.rank + (transform.rank * modifier);

	return {
		file,
		rank
	};
}

function copyCoord(coord: Coordinate) {
	return {
		file: coord.file,
		rank: coord.rank
	};
}