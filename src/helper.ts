/// <reference path="typings/internal.d.ts" />
export function getSquaresForMove(coordinate: Coordinate, movePattern: MovePattern, isWhite?: boolean): Coordinate[] {
	isWhite = isWhite || true;
	var coordinates: Coordinate[] = [];
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

export function getSquareForMoves(coordinate: Coordinate, movePatterns: MovePattern[]): Coordinate[] {
	var coordinates: Coordinate[] = [];
	movePatterns.forEach(move => coordinates.concat(getSquaresForMove(coordinate, move)));
	return coordinates;
}

export function applyIncrements(coordinate: Coordinate, incs: Coordinate[]): Coordinate[] {
	var coordinates: Coordinate[] = [];
	incs.forEach(inc => {
		var coord = { rank: coordinate.rank + inc.rank, file: coordinate.file + inc.file };
		if (coord.file > 0 && coord.rank > 0) coordinates.push(coord);
	});
	return coordinates;
}

export function inverseCoordinates(coordinates: Coordinate[]): Coordinate[] {
	return coordinates.map(coord => { return { rank: coord.rank*=1, file: coord.file*=-1 } } );
}

export function getIncrementer(direction: Chess.Direction): Coordinate[] {
	switch (direction) {
		case board.Direction.Up:
			return [{ rank: 1, file: 0}];
		case board.Direction.Down:
			return [{ rank: -1, file: 0}];
		case board.Direction.Left:
			return [{rank: 0, file: -1}];
		case bhess.Direction.Right:
			return [{rank: 0, file: 1}];
		case bhess.Direction.DiagonalUp:
			return [{rank: 1, file: -1}, {rank: 1, file: 1}];
		case bhess.Direction.DiagonalDown:
			return [{rank: -1, file: -1}, {rank: -1, file: 1}];
		default:
			throw "InvalidDirectionException: The direction provided was invalid";
	}
}

