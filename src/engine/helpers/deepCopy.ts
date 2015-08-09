import Chess = require("node-chess");
export = deepCopy;

function deepCopy(boardState: Chess.BoardState) {

	var copy: Chess.BoardState = {
		ranks: boardState.ranks.map(copyRank),
		tags: shallowCopy(boardState.tags)
	}

	return copy;
}

function copyRank(rank: Chess.Rank) {
	var copy: Chess.Rank = {
		rank: rank.rank,
		squares: []
	}

	rank.squares.forEach(sq => {
		copy.squares.push({
			rank: sq.rank,
			file: sq.file,
			piece: shallowCopy(sq.piece),
			tags: shallowCopy(sq.tags),
			availableMoves: copyAvailableMoves(sq.availableMoves)
		});
	});
	
	return copy;
}

function shallowCopy(object: Object) {
	var copy: any = {};
	var add = key => copy[key] = object[key];
	
	Object.keys(object)
		.forEach(add);
		
	return copy;
}

function copyAvailableMoves(moves: Chess.Move[]) {
	function copyMove(move: Chess.Move): Chess.Move {
		return {
			from: shallowCopy(move.from),
			to: shallowCopy(move.to),
			postMoveActions: move.postMoveActions ? move.postMoveActions.slice() : []
		};
	}
	
	return moves.map(copyMove);
}