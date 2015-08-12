import Chess = require("node-chess");
export = getMoves;

function getMoves(coordinate: Chess.Coordinate, boardState?: Chess.BoardState) {
	var self: Chess.Engine = this;
	boardState = boardState || self.boardState;

	return boardState.moves
		.filter(move => move.from.file === coordinate.file && move.from.rank === coordinate.rank);
}