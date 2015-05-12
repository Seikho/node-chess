export = movePiece;
function movePiece(from: Chess.Coordinate, to: Chess.Coordinate) {
	var origin: Chess.Square = this.getSquare(from);
	if (!origin || !origin.piece) return false;
		
	// Enforce turn-based movement
	if (this.whitesTurn !== origin.piece.isWhite) return false; 
		
	// The 'destination' square must be in the square's list of available moves
	if (!origin.availableMoves.some(availableMove => availableMove.file === to.file && availableMove.rank === to.rank)) return false;
	
	var destination: Chess.Square = this.getSquare(to);
	if (destination.piece) this.capturedPieces.push(destination.piece)

	destination.piece = origin.piece;
	destination.piece.location = { file: to.file, rank: to.rank }; 
	destination.availableMoves = [];
	destination.piece.moveHistory.push({from: from, to: to });
	
	origin.piece = null;
	origin.availableMoves = [];

	this.whitesTurn = !this.whitesTurn;
	this.populateAvailableMoves();
	this.moveNumber++;
	
	var postMoveFunctions: Chess.PostMoveFunction[] = this.postMoveFunctions;
	if (postMoveFunctions.length === 0) return true;
	postMoveFunctions.forEach(fn => {
		fn(destination.piece, this);
	});
	this.postMoveFunctions = [];
	
	return true;
}