import Chess = require("node-chess");
export = movePiece;
function movePiece(from: Chess.Coordinate, to: Chess.Coordinate) {
	var self: Chess.Engine = this;
	var origin: Chess.Square = self.getSquare(from);
	if (!origin || !origin.piece) return false;
		
	// Enforce turn-based movement
	if (self.whitesTurn !== origin.piece.isWhite) return false; 
		
	// The 'destination' square must be in the square's list of available moves
	var moveMatches = origin.availableMoves.filter(m => m.to.file === to.file && m.to.rank === to.rank);
	if (moveMatches.length === 0) return false;
	var move = moveMatches[0];

	var destination: Chess.Square = self.getSquare(to);
	if (destination.piece) self.capturedPieces.push(destination.piece)

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

	self.whitesTurn = !self.whitesTurn;
	self.populateAvailableMoves();

	var enginePostMoveActions: Chess.MoveFunction[] = self.postMoveFunctions || [];

	enginePostMoveActions.forEach(postMove => {
		if (!postMove.moveNumber || postMove.moveNumber === self.moveNumber)
			postMove.action(destination.piece, self);
	});
	
	self.moveNumber++;
	self.postMoveFunctions = enginePostMoveActions.filter(pmf => pmf.moveNumber >= self.moveNumber);
	
	return true;
}