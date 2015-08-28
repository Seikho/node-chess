import Chess = require("node-chess");
import Dir = Chess.Direction;
export = king;

var up = makeMove(0, 1);
var down = makeMove(0, -1);
var left = makeMove(-1, 0);
var right = makeMove(1, 0);
var upLeft = makeMove(-1, 1);
var upRight = makeMove(1, 1);
var downLeft = makeMove(-1, -1);
var downRight = makeMove(1, -1);

var queenSideCastle: Chess.MoveDefinition = {
	canMove: true,
	transforms: { file: -2, rank: 0, absolute: true },
	preCondition: castle(Dir.QueenSide, 4),
	postMoveAction: postCastle(Dir.QueenSide, 2)
}

var kingSideCastle: Chess.MoveDefinition = {
	canMove: true,
	transforms: { file: 2, rank: 0, absolute: true },
	preCondition: castle(Dir.KingSide, 3),
	postMoveAction: postCastle(Dir.KingSide, 1)
}

function makeMove(file: number, rank: number): Chess.MoveDefinition {
	return {
		canCapture: true,
		canMove: true,
		transforms: { file, rank }
	}
}

function castle(dir: Dir, count: number): Chess.MovePatternConditional {
	return (piece, state, board) => {
		// King is not allowed to have moved
		var kingMoves = state.moveHistory.filter(moves => moves.piece.id === piece.id);
		if (kingMoves.length > 0) return false;

		var coord = piece.getRelativeDestinations(dir, count)[0];
		var square = board.getSquare(coord, state);
		
		// Piece must be a rook and the same colour..
		if (square == null) return null;		
		if (square.piece == null) return false;
		if (square.piece.name !== "Rook") return false;
		if (square.piece.isWhite !== piece.isWhite) return false;
		
		// Rook must not have moved
		var rookMoves = state.moveHistory.filter(move => move.piece.id === square.piece.id);
		if (rookMoves.length > 0) return false;
		
		// All squares between the King and the Rook must be vacant
		var betweenSquares: Chess.Square[] = [];
		for (var x = 1; x < count; x++) {
			betweenSquares.push(board.getSquare(piece.getRelativeDestinations(dir, x)[0], state));
		}

		var allVacant = betweenSquares.every(sq => sq.piece == null);
		return allVacant;

	}
}

function postCastle(dir: Dir, count: number): Chess.MoveFunction {
	return {
		action: (piece, state, board) => {
			var oppositeDir = oppositeDirection(dir);

			var rookSquare = board.getSquare(
				piece.getRelativeDestinations(dir, count)[0],
				state);

			var newRookSquare = board.getSquare(
				piece.getRelativeDestinations(oppositeDir, 1)[0],
				state);
			
			newRookSquare.piece = rookSquare.piece;
			rookSquare.piece = null;
		}
	}
}

function oppositeDirection(dir: Dir): Dir {
	return dir === Dir.QueenSide
		? Dir.KingSide
		: Dir.QueenSide;
}

var king: Chess.NewPiece = {
	notation: "k",
	name: "King",
	movement: [upLeft, upRight, downLeft, downRight, up, down, left, right, queenSideCastle, kingSideCastle],
	canQueen: false,
	canSpawn: false,
	value: 10
}
