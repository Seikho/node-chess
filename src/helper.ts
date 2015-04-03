import Chess = require("./types");

export function getSquaresForMoves(coordinate: Chess.Coordinate, piece: Chess.Piece): Chess.Coordinate[] {
	var coordinates: Chess.Coordinate[] = [];
	if (!piece) return [];
	piece.movement.forEach(move => coordinates = coordinates.concat(getSquaresForMove(coordinate, move, piece.isWhite)));
	return coordinates;
}

export function getSquaresForMove(coordinate: Chess.Coordinate, movePattern: Chess.MovePattern, isWhite?: boolean, bounds?: Chess.Coordinate): Chess.Coordinate[] {
	isWhite = !!isWhite;
	var coordinates: Chess.Coordinate[] = [];
	var moves = movePattern.moves;
	bounds = bounds || { rank: 8, file: 8 };
	var moveArrays: Chess.Coordinate[] = [];

	var appliedCoords = applyCounts(coordinate, getIncrementer(moves[0].direction), moves[0].count, isWhite, bounds);

	// If there's only one SingleMove, all processing has been completed. Return our applied coordinates.
	if (moves.length === 1) return appliedCoords;

	var incs = getIncrementer(moves[1].direction);

	appliedCoords.forEach(ac => {
		moveArrays = moveArrays.concat(applyCounts({rank: ac.rank, file: ac.file}, incs, moves[1].count, isWhite, bounds));
	});
	return moveArrays;
}

export function applyCounts(coordinate: Chess.Coordinate, incrementers: Chess.Coordinate[], count: number, isWhite: boolean, bounds: Chess.Coordinate) {
	var inverser = isWhite ? 1 : -1;
	var returnCoords: Chess.Coordinate[] = [];
	if (count > 0) {
		incrementers.forEach(inc => {
			inc.file *= (count*inverser);
			inc.rank *= (count*inverser);
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
			var newInc = { rank: inc.rank * count, file: inc.file * count };
			newCoord = { rank: coordinate.rank + newInc.rank, file: coordinate.file + newInc.file };
			if (isInBounds(newCoord, bounds)) returnCoords.push({rank: newCoord.rank, file: newCoord.file });
			count++;
		}
	}
	return returnCoords;
}

export function isInBounds(coordinate: Chess.Coordinate, bounds: Chess.Coordinate): boolean {
	return coordinate.rank <= bounds.rank && coordinate.file <= bounds.file && coordinate.rank > 0 && coordinate.file > 0;
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
