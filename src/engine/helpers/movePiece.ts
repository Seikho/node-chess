import Chess = require("node-chess");
import deepCopy = require("./deepCopy");
export = movePiece;

function movePiece(from: Chess.Coordinate, to: Chess.Coordinate, boardState?: Chess.BoardState): Chess.BoardState {
	var self: Chess.Engine = this;
	
	// TODO: Replace with better method
	// If no boardState is provided, the result of this function is stored as the calling engine's new board state 
	var saveToBoard = !!boardState;
	boardState = deepCopy(boardState || self.boardState);
	
	var origin: Chess.Square = self.getSquare(from, boardState);
	if (!origin || !origin.piece) return boardState;			
	
	// Enforce turn-based movement
	if (boardState.whitesTurn !== origin.piece.isWhite) return boardState; 
		
	// The 'destination' square must be in the square's list of available moves
	var moveMatches = origin.availableMoves.filter(m => m.to.file === to.file && m.to.rank === to.rank);
	if (moveMatches.length === 0) return boardState;
	var move = moveMatches[0];

	var destination: Chess.Square = self.getSquare(to, boardState);
	if (destination.piece) boardState.capturedPieces.push(destination.piece)

	destination.piece = origin.piece;
	destination.piece.location = { file: to.file, rank: to.rank };
	destination.availableMoves = [];
	destination.piece.moveHistory.push({ from: from, to: to });
	
	var movePatternPostActions = move.postMoveActions || [];
	movePatternPostActions.forEach(func => {
		func.action(destination.piece, self);
	});
	
	var pieceFunctions = destination.piece.postMoveFunctions || [];
	pieceFunctions.forEach(fn => fn.action(destination.piece, self));
	
	origin.piece = null;
	origin.availableMoves = [];

	boardState.whitesTurn = !boardState.whitesTurn;
	self.populateAvailableMoves(boardState);

	var enginePostMoveActions: Chess.MoveFunction[] = boardState.postMoveFunctions || [];

	enginePostMoveActions.forEach(postMove => {
		if (!postMove.moveNumber || postMove.moveNumber === boardState.moveNumber)
			postMove.action(destination.piece, self);
	});
	
	boardState.moveNumber++;
	boardState.postMoveFunctions = enginePostMoveActions.filter(pmf => pmf.moveNumber >= boardState.moveNumber);
	
	if (saveToBoard) self.boardState = boardState;
	return boardState;
}