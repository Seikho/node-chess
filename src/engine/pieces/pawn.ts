export = pawn;

var firstMovePattern = {
	moves: [{ direction: Chess.Direction.Up, count: 2 }],
	canJump: false,
	canCapture: false,
	canMove: true
}

var leftEnpassant = {
	moves: [{ direction: Chess.Direction.UpLeft, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false
}

var rightEnpassant = {
	moves: [{ direction: Chess.Direction.UpRight, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false
}

var firstMove: Chess.ConditionalMovement = {
	action: (piece) => {
		if (piece.moveHistory.length === 0) return firstMovePattern;
		return null;
	}
}

function hasEnpassantTag(direction: Chess.Direction, piece: Chess.BasePiece, board: Chess.Engine) {
	var coordinate = piece.getRelativeDestinations(direction, 1);
	
	var square = board.getSquare(coordinate[0]);
	
	if (square === null) return false;
	if (square.tags === null) return false;
	
	// If the square has an 'enpassant' tag of the opposite color (!thisPiece.isWhite), we can capture.
	var result = square.tags.some(tag => tag.enpassant === !piece.isWhite);
	return result;
}

var enpassantCapture: Chess.ConditionalMovement = {
	action: (piece, board) => {
		var captures = [];
		if (hasEnpassantTag(Chess.Direction.UpLeft, piece, board)) captures.push(leftEnpassant);
		if (hasEnpassantTag(Chess.Direction.UpRight, piece, board)) captures.push(rightEnpassant);
		return captures.length === 0 ? null : captures;
	}
}

var allowEnpassantCapture: Chess.ConditionalMovement = {
    action: function(piece, board) {
		// Only apply the 'EnPassant' tag if this is the first move and we moved 2 squares
        if (piece.moveHistory.length !== 1) return null;
        var move = piece.moveHistory[0];
        var squaresMoved = Math.abs(move.from.rank - move.to.rank);
		
        if (squaresMoved !== 2) return null;

		// Find the middle square between the originating and desination squares for tagging
		var coordinateToTag = piece.getRelativeDestinations(Chess.Direction.Down, 1)[0];
		var squareToTag = board.getSquare(coordinateToTag);
        squareToTag.tags.push({ enpassant: piece.isWhite });
		
		//TODO: Add PostMoveFunction to board to remove the tag after the next move.
    }
};

var moveForward = {
	moves: [{ direction: Chess.Direction.Up, count: 1 }],
	canJump: false,
	canCapture: false,
	canMove: true
}

var moveCapture = {
	moves: [{ direction: Chess.Direction.DiagonalUp, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false
}

var forward: Chess.SingleMove = {
	direction: Chess.Direction.Up,
	count: 1
}

var pawn: Chess.Piece = {
	location: null,
	name: "Pawn",
	movement: [moveForward, moveCapture],
	canQueen: true,
	canSpawn: false,
	value: 1,
	conditionalMoves: [firstMove, enpassantCapture],
	notation: "p",
	postMoveFunctions: [allowEnpassantCapture]
}

