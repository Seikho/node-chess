export = pawn;

var firstMoveCondition: Chess.MovePatternConditional = (piece) => {
	return (piece.moveHistory.length === 0);
}

var canLeftEnpassant: Chess.MovePatternConditional = (piece, board) => {
	return hasEnpassantTag(Chess.Direction.UpLeft, piece, board);
}

var canRightEnpassant: Chess.MovePatternConditional = (piece, board) => {
	return hasEnpassantTag(Chess.Direction.UpRight, piece, board);
}

var enpassantPostMove: Chess.PostMoveFunction = {
	action: (piece, board) => {
		var coordBelow = piece.getRelativeDestinations(Chess.Direction.Down, 1)[0];
		var squareBelow = board.getSquare(coordBelow);
		board.capturedPieces.push(squareBelow.piece);
		squareBelow.piece = null;
	}
}

var allowEnpassantCapture: Chess.PostMoveFunction = {
    action: function(piece, board) {
		// Find the middle square between the originating and desination squares for tagging
		var coordinateToTag = piece.getRelativeDestinations(Chess.Direction.Down, 1)[0];
		var squareToTag = board.getSquare(coordinateToTag);
        squareToTag.tags["enpassant"] = piece.isWhite;
		
		board.postMoveActions.push({
			moveNumber: board.moveNumber+1,
			action: (piece, board) => {
				
			}
		});
		//TODO: Add PostMoveFunction to board to remove the tag after the next move.
    }
};

var firstMovePattern: Chess.MovePattern = {
	moves: [{ direction: Chess.Direction.Up, count: 2 }],
	canJump: false,
	canCapture: false,
	canMove: true,
	useDefaultConditions: true,
	conditions: [firstMoveCondition],
	postMoveActions: [allowEnpassantCapture]
}

var leftEnpassant: Chess.MovePattern = {
	moves: [{ direction: Chess.Direction.UpLeft, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false,
	useDefaultConditions: false,
	conditions: [canLeftEnpassant],
	postMoveActions: [enpassantPostMove]
}

var rightEnpassant: Chess.MovePattern = {
	moves: [{ direction: Chess.Direction.UpRight, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false,
	useDefaultConditions: false,
	conditions: [canRightEnpassant],
	postMoveActions: [enpassantPostMove]
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
	movement: [moveForward, moveCapture, firstMovePattern, leftEnpassant, rightEnpassant],
	canQueen: true,
	canSpawn: false,
	value: 1,
	notation: "p"
}

