import Chess = require("node-chess");

function infer(piece: Chess.NewPiece, boardState?: Chess.BoardState) {
	var self: Chess.Engine = this;
	boardState = boardState || self.boardState;

}

function process(move: Chess.MoveDefinition, piece: Chess.NewPiece, boardState: Chess.BoardState) {
	var modifier = piece.isWhite ? 1 : -1;
	var transformedCoords = [];
	var transforms = move.transforms;
	
	if (transforms instanceof Array) {
		for (var x = 0; x < transforms.length; x++) {
			transformedCoords.push(applyTransform(piece.location, transforms[x], modifier));
		}
	} else transformedCoords.push(piece.location, transforms, modifier);
	
	
}

function applyTransform(coordinate: Chess.Coordinate, transform: Chess.Coordinate, modifier: number) {
	var file = coordinate.file + (transform.file * modifier);
	var rank = coordinate.rank + (transform.rank * modifier);
	
	return {
		file, rank
	};
}