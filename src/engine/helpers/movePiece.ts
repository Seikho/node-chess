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

	origin.piece.location = { file: to.file, rank: to.rank };
	origin.piece.moveHistory.push({ from: from, to: to });
	this.ranks[to.rank].squares[to.file] = {
		availableMoves: [],
		piece: origin.piece,
		file: to.file
	}

	this.ranks[from.rank].squares[from.file] = {
		availableMoves: [],
		piece: null,
		file: from.file
	}

	this.whitesTurn = !this.whitesTurn;
	this.populateAvailableMoves();
	return true;
}