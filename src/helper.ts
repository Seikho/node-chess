import Chess = require("./types");

export function getSquaresForMove(coordinate: Chess.Coordinate, movePattern: Chess.MovePattern, isWhite?: boolean, bounds?: Chess.Coordinate): Chess.Coordinate[] {
	isWhite = !!isWhite;
	var coordinates: Chess.Coordinate[] = [];
	var moves = movePattern.moves;
	bounds = bounds || { rank: 8, file: 8};

	var moveArrays: Array<Chess.Coordinate[]> = [];
	for (var s in moves) {
		var sm = moves[s];
		var incs = getIncrementer(sm.direction);

	}
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

export function applyCounts(coordinate: Chess.Coordinate, incrementers: Chess.Coordinate[], count: number, isWhite: boolean, bounds: Chess.Coordinate) {
	var returnCoords: Chess.Coordinate[] = [];
	if (count > 0) {
		incrementers.forEach(inc => {
			inc.file *= count;
			inc.rank *= count;
			var newCoord = { rank: coordinate.rank + inc.rank, file: coordinate.file + inc.file };
			if (isInBounds(newCoord, bounds)) returnCoords.push(newCoord);
		});
		return returnCoords;
	}

	var count = 1;
	for (var i in incrementers) {
		var inc = incrementers[i];
		var newCoord = { rank: bounds.rank, file: bounds.file };
		var count = 1;
		while (isInBounds(newCoord, bounds)) {
			var newInc = { rank: inc.rank *= count, file: inc.file *= count };
			newCoord = { rank: coordinate.rank + newInc.rank, file: coordinate.file + newInc.file };
			if (isInBounds(newCoord, bounds)) returnCoords.push({rank: newCoord.rank, file: newCoord.file });
		}
	}
	return returnCoords;
}

export function isInBounds(coordinate: Chess.Coordinate, bounds: Chess.Coordinate): boolean {
	return coordinate.rank <= bounds.rank && coordinate.file <= bounds.file;
}

export function getSquareForMoves(coordinate: Chess.Coordinate, movePatterns: Chess.MovePattern[]): Chess.Coordinate[] {
	var coordinates: Chess.Coordinate[] = [];
	movePatterns.forEach(move => coordinates.concat(getSquaresForMove(coordinate, move)));
	return coordinates;
}

export function applyIncrements(coordinate: Chess.Coordinate, incs: Chess.Coordinate[], bounds?: Chess.Coordinate): Chess.Coordinate {
	bounds = bounds || { rank: 8, file: 8 };
	var originalCoordinate = {
		rank: coordinate.rank,
		file: coordinate.file
	};
	var coordinates: Chess.Coordinate[] = [];
	for (var i = 0; i < incs.length; i++) {
		var inc = incs[i];
		var coord = { rank: coordinate.rank + inc.rank, file: coordinate.file + inc.file };
		if (coord.file > 0 && coord.file <= bounds.file && coord.rank > 0 && coord.rank <= bounds.rank) {
			coordinate = coord;
		} else return originalCoordinate;
	}
	return coordinate;
}

export function inverseCoordinates(coordinates: Chess.Coordinate[]): Chess.Coordinate[] {
	return coordinates.map(coord => { return { rank: coord.rank*=-1, file: coord.file*=-1 } } );
}

export function singleMovesToIncrements(moves: Chess.SingleMove[]): Chess.Coordinate[] {
	var coordinates: Chess.Coordinate[] = [];
	moves.forEach(move => {
		var inc = getIncrementer(move.direction);
		inc[0].rank *= move.count;
		inc[0].file *= move.count;
		coordinates.push(inc[0]);
	});
	return coordinates;
}

export function getIncrementer(direction: Chess.Direction): Chess.Coordinate[] {
	var up = {rank: 1, file: 0};
	var down = {rank: -1, file: 0};
	var left = {rank: 0, file: -1};
	var right = {rank: 0, file: 1};
	var upLeft = {rank: 1, file: -1};
	var upRight = {rank: 1, file: 1};
	var downLeft = {rank: -1, file: -1};
	var downRight = {rank: -1, file: 1};
	switch (direction) {
		case Chess.Direction.Up:
			return [up];
		case Chess.Direction.Down:
			return [down];
		case Chess.Direction.Left:
			return [left];
		case Chess.Direction.Right:
			return [right];
		case Chess.Direction.DiagonalUp:
			return [upLeft, upRight];
		case Chess.Direction.DiagonalDown:
			return [downLeft, downRight];
		case Chess.Direction.Diagonal:
			return [upLeft, upRight, downLeft, downRight];
		case Chess.Direction.Horizontal:
			return [left, right];
		case Chess.Direction.Vertical:
			return [up, down];
		case Chess.Direction.Lateral:
			return [up, down, left, right];
		default:
			throw "InvalidDirectionException: The direction provided was invalid";
	}
}
