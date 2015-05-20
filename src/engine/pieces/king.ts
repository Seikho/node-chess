export = king;

var queenSideCastleCondition: Chess.MovePatternConditional = (piece, board) => {
	if (piece.moveHistory.length > 0) return false;
	var leftQueen = getLeftSquare(piece, board, 1);
	var leftBishop = getLeftSquare(piece, board, 2);
	var leftKnight = getLeftSquare(piece, board, 3);
	var leftRook = getLeftSquare(piece, board, 4);
		
	if (!!leftQueen.piece || !!leftBishop.piece || !!leftKnight.piece) return false;
	if (!leftRook.piece) return false;
	return leftRook.piece.moveHistory.length === 0;
}

var kingSideCastleCondition: Chess.MovePatternConditional = (piece, board) => {
	if (piece.moveHistory.length > 0) return false;
	var rightBishop = getLeftSquare(piece, board, 1);
	var rightKnight = getLeftSquare(piece, board, 2);
	var rightRook = getLeftSquare(piece, board, 3);
		
	if (!!rightBishop.piece || !!rightKnight.piece) return false;
	if (!rightRook.piece) return false;
	return rightRook.piece.moveHistory.length === 0;
}

var postQueenSideCastle: Chess.PostMoveFunction = {
	action: (piece, board) => {
		var leftRookSquare = getLeftSquare(piece, board, 3);
		var immediateLeftSquare = getLeftSquare(piece, board, 1);
		immediateLeftSquare.piece = leftRookSquare.piece;
		leftRookSquare.piece = null;
	}
}

var postKingSideCastle: Chess.PostMoveFunction = {
	action: (piece, board) => {
		var rightRookSquare = getRightSquare(piece, board, 2);
		var immediateRightSquare = getRightSquare(piece, board, 1);
		immediateRightSquare.piece = rightRookSquare.piece;
		rightRookSquare.piece = null;
	}
}

var queenSideCastle: Chess.MovePattern = {
	moves: [{ direction: Chess.Direction.Left, count: 2 }],
	canCapture: false,
	canMove: true,
	canJump: false,
	useDefaultConditions: false,
	conditions: [queenSideCastleCondition],
	postMoveActions: [postQueenSideCastle]
}

var kingSideCastle: Chess.MovePattern = {
	moves: [{ direction: Chess.Direction.Right, count: 2 }],
	canCapture: false,
	canMove: true,
	canJump: false,
	useDefaultConditions: false,
	conditions: [kingSideCastleCondition],
}

function getLeftSquare(piece: Chess.BasePiece, board: Chess.Engine, count: number) {
	var coord = piece.getRelativeDestinations(Chess.Direction.Left, count)[0];
	return board.getSquare(coord);
}

function getRightSquare(piece: Chess.BasePiece, board: Chess.Engine, count: number) {
	var coord = piece.getRelativeDestinations(Chess.Direction.Right, count)[0];
	return board.getSquare(coord);
}

var diag = {
	moves: [{ direction: Chess.Direction.Diagonal, count: 1 }],
	canJump: false,
	canMove: true,
	canCapture: true
}

var lat = {
	moves: [{ direction: Chess.Direction.Lateral, count: 1 }],
	canJump: false,
	canMove: true,
	canCapture: true
}

var king = {
	name: "King",
	movement: [diag, lat, kingSideCastle, queenSideCastle],
	canQueen: false,
	canSpawn: false,
	value: 10,
	notation: "k"
}