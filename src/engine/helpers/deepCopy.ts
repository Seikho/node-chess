import Chess = require("node-chess");
export = deepCopy;

function deepCopy(boardState: Chess.BoardState) {

	var copy: Chess.BoardState = {
		ranks: boardState.ranks.map(copyRank),
		tags: shallowCopy(boardState.tags),
		moveNumber: boardState.moveNumber,
		whitesTurn: boardState.whitesTurn,
		capturedPieces: boardState.capturedPieces.slice(),
		preMoveFunctions: boardState.preMoveFunctions.slice(),
		postMoveFunctions: boardState.postMoveFunctions.slice(),
		moves: boardState.moves.slice(),
		moveHistory: boardState.moveHistory.slice()
	}

	return copy;
}

function copyRank(rank: Chess.Rank) {
	var copy: Chess.Rank = {
		rank: rank.rank,
		squares: []
	}

	rank.squares.forEach((sq, i) => {
		copy.squares[i] = {
			rank: sq.rank,
			file: sq.file,
			piece: copyPiece(sq.piece),
			tags: shallowCopy(sq.tags),
		};
	});
	
	return copy;
}

function shallowCopy(object: Object) {
	var copy: any = {};
	if (!object) return copy;

	var add = key => copy[key] = object[key];
	
	Object.keys(object)
		.forEach(add);
		
	return copy;
}

function copyPiece(piece: Chess.BasePiece): Chess.BasePiece {
	if (!piece) return null;
	
	var copy: Chess.BasePiece = shallowCopy(piece);
	copy.location = { rank: piece.location.rank, file: piece.location.file };
	copy.movement = shallowCopyArray(piece.movement);
	copy.getRelativeDestinations = piece.getRelativeDestinations
	copy.postMoveFunctions = piece.postMoveFunctions.slice();
	return copy; 
}

function copyAvailableMoves(moves: Chess.Move[]) {
	function copyMove(move: Chess.Move): Chess.Move {
		return {
			from: shallowCopy(move.from),
			to: shallowCopy(move.to),
			postMoveActions: shallowCopyArray(move.postMoveActions),
			isWhite: move.isWhite
		};
	}
	var newMoves = [];
	moves.forEach(m => newMoves.push(copyMove(m)));
	return newMoves;
}

function copyMoveHistory(history: Chess.MoveHistory[]) {
	function copyHistory(hist: Chess.MoveHistory): Chess.MoveHistory {
		return {
			from: shallowCopy(hist.from),
			to: shallowCopy(hist.to),
			piece: hist.piece
		};
	}
	var newHistory = [];
	history.forEach(h => newHistory.push(copyHistory(h)));
	return newHistory;
}

function shallowCopyArray(array: any[]) {
	return array ? array.slice() : []; 
}