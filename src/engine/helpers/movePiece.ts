import Engine from '../index';
import {
	BoardState,
	Square,
	Move,
	MoveFunction, BoardPiece,
} from '../../types';
import deepCopy from './deepCopy';

/**
 * Check piece move can be made based off a pre-processed list of valid moves
 * Therefore it's possible to run an invalid board state as long as the moves are valid
 *
 * @param move
 * @param _boardState
 */
type TCalculateMovePieceResult  = {newBoardState: BoardState, pieceAfterMove: BoardPiece} | null
export function calculateMovePiece(this: Engine, move: Move, _boardState: BoardState): TCalculateMovePieceResult {

	const newBoardState = deepCopy(_boardState);

	const from = move.from;
	const to = move.to;

	// Check square exists, and has a piece
	const fromSquare: Square = this.getSquare(from, newBoardState);
	if (!fromSquare || !fromSquare.piece) return null;

	// Enforce turn-based movement
	if (newBoardState.whitesTurn !== fromSquare.piece.isWhite) return null;

	// The 'destination' square must be in the square's list of available moves
	const moveDefinition = newBoardState.moves.filter(m =>
		m.from.file === from.file && m.from.rank === from.rank &&
		m.to.file === to.file && m.to.rank === to.rank)[0];
	if (!moveDefinition) return null;

	// Check destination has a piece, if so, capture it
	const destination: Square = this.getSquare(to, newBoardState);
	if (destination.piece) newBoardState.capturedPieces.push(destination.piece)

	// Update squares
	destination.piece = fromSquare.piece;
	fromSquare.piece = null
	// Update piece location
	destination.piece.location = { file: to.file, rank: to.rank };

	const pieceAfterMove = destination.piece;

	// Run other move logic, castle, upgrade etc
	const movePatternPostActions = moveDefinition.postMoveActions || [];
	movePatternPostActions.forEach(func => {
		func.action(pieceAfterMove, newBoardState, this);
	});

	// Run other piece logic
	const pieceFunctions = destination.piece.postMoveFunctions || [];
	pieceFunctions.forEach(fn => fn.action(pieceAfterMove, newBoardState, this));

	// Set turn
	newBoardState.whitesTurn = !newBoardState.whitesTurn;

	// Infer new moves
	this.populateAvailableMoves(newBoardState);

	// Run post move functions, includes things such as marking square as enpassant
	const enginePostMoveActions: MoveFunction[] = newBoardState.postMoveFunctions || [];

	enginePostMoveActions.forEach(postMove => {
		if (!postMove.moveNumber || postMove.moveNumber === newBoardState.moveNumber)
			postMove.action(pieceAfterMove, newBoardState, this);
	});

	// Update move history
	newBoardState.moveHistory.push({ from: from, to: to, piece: destination.piece });
	// Update move count, perhaps length of moveHistory !== moveCount?
	newBoardState.moveNumber++;

	newBoardState.postMoveFunctions = enginePostMoveActions.filter(pmf => !pmf.moveNumber || pmf.moveNumber >= newBoardState.moveNumber);

	return {
		newBoardState,
		pieceAfterMove
	};
}

export default function movePiece(this: Engine, move: Move): BoardState | null {

	const res = calculateMovePiece.bind(this)(move, this.boardState);

	if (res === null) return null

	this.postMoveFunctions.forEach(moveFn => {
		moveFn.action(res.pieceAfterMove, res.newBoardState, this);
	});

	this.boardState = res.newBoardState;
	return res.newBoardState;
}

// export default function movePiece(this: Engine, move: Move, boardState?: BoardState): BoardState | null {
// 	const from = move.from;
// 	const to = move.to;
//
// 	// TODO: Replace with better method
// 	// If no boardState is provided, the result of this function is stored as the calling engine's new board state
// 	const saveToBoard = !boardState;
// 	boardState = deepCopy(boardState || this.boardState);
//
// 	var origin: Square = this.getSquare(from, boardState);
// 	if (!origin || !origin.piece) return null;
//
// 	// Enforce turn-based movement
// 	if (boardState.whitesTurn !== origin.piece.isWhite) return null;
//
// 	// The 'destination' square must be in the square's list of available moves
// 	var pieceMove = boardState.moves.filter(m =>
// 		m.from.file === from.file && m.from.rank === from.rank &&
// 		m.to.file === to.file && m.to.rank === to.rank)[0];
// 	if (!pieceMove) return null;
//
// 	var destination: Square = this.getSquare(to, boardState);
// 	if (destination.piece) boardState.capturedPieces.push(destination.piece)
//
// 	destination.piece = origin.piece;
// 	destination.piece.location = { file: to.file, rank: to.rank };
// 	boardState.moveHistory.push({ from: from, to: to, piece: destination.piece });
//
// 	var movePatternPostActions = pieceMove.postMoveActions || [];
// 	movePatternPostActions.forEach(func => {
// 		func.action(destination.piece, boardState, this);
// 	});
//
// 	var pieceFunctions = destination.piece.postMoveFunctions || [];
// 	pieceFunctions.forEach(fn => fn.action(destination.piece, boardState, this));
//
// 	origin.piece = null;
//
// 	boardState.whitesTurn = !boardState.whitesTurn;
//
// 	this.populateAvailableMoves(boardState);
//
// 	var enginePostMoveActions: MoveFunction[] = boardState.postMoveFunctions || [];
//
// 	enginePostMoveActions.forEach(postMove => {
// 		if (!postMove.moveNumber || postMove.moveNumber === boardState.moveNumber)
// 			postMove.action(destination.piece, boardState, this);
// 	});
// 	boardState.moveNumber++;
// 	boardState.postMoveFunctions = enginePostMoveActions.filter(pmf => !pmf.moveNumber || pmf.moveNumber >= boardState.moveNumber);
//
// 	// We only call post move functions if we're saving state
// 	if (!saveToBoard) return boardState;
//
// 	this.postMoveFunctions.forEach(moveFn => {
// 		moveFn.action(destination.piece, boardState, this);
// 	});
// 	this.boardState = boardState;
//
// 	return boardState;
// }
