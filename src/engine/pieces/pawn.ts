import Chess = require("node-chess");
import enums = require("../../enums");
import Direction = enums.Direction;
export = pawn;

var firstMoveCondition: Chess.MovePatternConditional = (piece) => {
	return (piece.moveHistory.length === 0);
}

var canLeftEnpassant: Chess.MovePatternConditional = (piece, boardState, board) => {
	return hasEnpassantTag(Direction.UpLeft, piece, boardState, board);
}

var canRightEnpassant: Chess.MovePatternConditional = (piece, boardState, board) => {
	return hasEnpassantTag(Direction.UpRight, piece, boardState, board);
}

var enpassantPostMove: Chess.MoveFunction = {
	action: (piece, boardState, board) => {
		var pieceCurrentSquare = board.getSquare(piece.location, boardState);
		var coordBelow = piece.getRelativeDestinations(Direction.Down, 1)[0];
		var squareBelow = board.getSquare(coordBelow, boardState);
		boardState.capturedPieces.push(squareBelow.piece);
		squareBelow.piece = null;
		pieceCurrentSquare.tags["enpassant"] = undefined;
	}
}

var allowEnpassantCapture: Chess.MoveFunction = {
    action: function(piece, boardState, board) {
		// Find the middle square between the originating and desination squares for tagging
		var coordinateToTag = piece.getRelativeDestinations(Direction.Down, 1)[0];
		var squareToTag = board.getSquare(coordinateToTag, boardState);
        squareToTag.tags["enpassant"] = piece.isWhite;
		
		boardState.postMoveFunctions.push({
			moveNumber: board.boardState.moveNumber+1,
			action: (piece, board) => {
				
			}
		});
		//TODO: Add PostMoveFunction to board to remove the tag after the next move.
    }
};

var firstMovePattern: Chess.MovePattern = {
	moves: [{ direction: Direction.Up, count: 2 }],
	canJump: false,
	canCapture: false,
	canMove: true,
	useDefaultConditions: true,
	conditions: [firstMoveCondition],
	postMoveActions: [allowEnpassantCapture]
}

var leftEnpassant: Chess.MovePattern = {
	moves: [{ direction: Direction.UpLeft, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false,
	useDefaultConditions: false,
	conditions: [canLeftEnpassant],
	postMoveActions: [enpassantPostMove]
}

var rightEnpassant: Chess.MovePattern = {
	moves: [{ direction: Direction.UpRight, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false,
	useDefaultConditions: false,
	conditions: [canRightEnpassant],
	postMoveActions: [enpassantPostMove]
}

function hasEnpassantTag(direction: Direction, piece: Chess.BasePiece, boardState: Chess.BoardState, board: Chess.Engine) {
	var coordinate = piece.getRelativeDestinations(direction, 1);
	
	var square = board.getSquare(coordinate[0], boardState);
	
	if (square === null) return false;
	if (square.tags === null) return false;
	
	// If the square has an 'enpassant' tag of the opposite color (!thisPiece.isWhite), we can capture.
	var result = square.tags["enpassant"] === !piece.isWhite;
	return result;
}

var moveForward = {
	moves: [{ direction: Direction.Up, count: 1 }],
	canJump: false,
	canCapture: false,
	canMove: true
}

var moveCapture = {
	moves: [{ direction: Direction.DiagonalUp, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false
}

var forward: Chess.SingleMove = {
	direction: Direction.Up,
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

