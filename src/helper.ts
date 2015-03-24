/// <reference path="typings/internal.d.ts" />
import Chess = require("./types");
export function getSquaresForMove(coordinate: Chess.Coordinate, movePattern: Chess.MovePattern, isWhite?: boolean): Chess.Coordinate[] {
	isWhite = isWhite || true;
	var coordinates: Chess.Coordinate[] = [];
	var moves = movePattern.moves;

	// Can only provide two (2) single moves. Providing more makes no logical sense
	// An error will get thrown to explicitly disallow this
	if (moves.length > 2) return coordinates;
	if (moves.length === 2) {
		if (moves[0].count === 0 && moves[1].count === 0) return coordinates;
		var incLeft = getIncrementer(moves[0].direction);
		var incRight = getIncrementer(moves[1].direction);
		if (!isWhite) {
			incLeft = inverseCoordinates(incLeft);
			incRight = inverseCoordinates(incRight);
		}
		/// Invalid move definition: Cannot have infinte moves in both directions -- This limit will be removed
		if (moves[0].count !== 0 && moves[1].count !== 0) {
		}	
	} 

	movePattern.moves.forEach(singleMove => {

	});
	return coordinates;
}

export function getSquareForMoves(coordinate: Chess.Coordinate, movePatterns: Chess.MovePattern[]): Chess.Coordinate[] {
	var coordinates: Chess.Coordinate[] = [];
	movePatterns.forEach(move => coordinates.concat(getSquaresForMove(coordinate, move)));
	return coordinates;
}

export function applyIncrements(coordinate: Chess.Coordinate, incs: Chess.Coordinate[]): Chess.Coordinate[] {
	var coordinates: Chess.Coordinate[] = [];
	incs.forEach(inc => {
		var coord = { rank: coordinate.rank + inc.rank, file: coordinate.file + inc.file };
		if (coord.file > 0 && coord.rank > 0) coordinates.push(coord);
	});
	return coordinates;
}

export function inverseCoordinates(coordinates: Chess.Coordinate[]): Chess.Coordinate[] {
	return coordinates.map(coord => { return { rank: coord.rank*=1, file: coord.file*=-1 } } );
}

export function getIncrementer(direction: Chess.Direction): Chess.Coordinate[] {
	switch (direction) {
		case Chess.Direction.Up:
			return [{ rank: 1, file: 0}];
		case Chess.Direction.Down:
			return [{ rank: -1, file: 0}];
		case Chess.Direction.Left:
			return [{rank: 0, file: -1}];
		case Chess.Direction.Right:
			return [{rank: 0, file: 1}];
		case Chess.Direction.DiagonalUp:
			return [{rank: 1, file: -1}, {rank: 1, file: 1}];
		case Chess.Direction.DiagonalDown:
			return [{rank: -1, file: -1}, {rank: -1, file: 1}];
		default:
			throw "InvalidDirectionException: The direction provided was invalid";
	}
}
