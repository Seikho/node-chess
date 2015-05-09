export = movePiece;
function movePiece(move: Chess.Move) {
	var origin = this.getSquare(move.from);
	if (!origin || !origin.piece) return false;
		
	// Enforce turn-based movement
	if (this.whitesTurn !== origin.piece.isWhite) return false; 
		
	// The 'destination' square must be in the square's list of available moves
	if (!origin.availableMoves.some(availableMove => availableMove.file === move.to.file && availableMove.rank === move.to.rank)) return false;
	var destination = this.getSquare(move.to);
	if (destination.piece) this.capturedPieces.push(destination.piece)

	origin.piece.moveHistory.push(move);
	this.ranks[move.to.rank].squares[move.to.file] = {
		availableMoves: [],
		piece: origin.piece,
		file: move.to.file
	}

	this.ranks[move.from.rank].squares[move.from.file] = {
		availableMoves: [],
		piece: null,
		file: move.from.file
	}

	this.whitesTurn = !this.whitesTurn;
	this.populateAvailableMoves();
	return true;
}