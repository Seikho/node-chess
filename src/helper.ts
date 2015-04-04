import Chess = require("./types");

export function getSquaresForMoves(coordinate: Chess.Coordinate, piece: Chess.Piece): Chess.Coordinate[] {
	var coordinates: Chess.Coordinate[] = [];
	if (!piece) return [];
	piece.movement.forEach(move => coordinates = coordinates.concat(getSquaresForMove(coordinate, move, piece.isWhite)));
	return coordinates;
}

export function getSquaresForMove(coordinate: Chess.Coordinate, movePattern: Chess.MovePattern, isWhite?: boolean, bounds?: Chess.Coordinate): Chess.Coordinate[] {
	isWhite = !!isWhite;
	bounds = bounds || { rank: 8, file: 8 };
	var coordinates: Chess.Coordinate[] = [];

	movePattern.moves.forEach(move => {
		var incrementers = getIncrementers(move, isWhite);
		console.log("Incs: %s", JSON.stringify(incrementers));
		coordinates = addMatrices(coordinates, incrementers);
	});
	return addMatrices([coordinate], coordinates).filter(coord => isInBounds(coord, bounds));
}

export function isInBounds(coordinate: Chess.Coordinate, bounds: Chess.Coordinate): boolean {
	return coordinate.rank <= bounds.rank && coordinate.file <= bounds.file && coordinate.rank > 0 && coordinate.file > 0;
}

export function addMatrices(left: Chess.Coordinate[], right: Chess.Coordinate[], bounds?: Chess.Coordinate): Chess.Coordinate[] {
	// Return N | N*M -- whichever is greater
	if (left.length === 0) return right;
	if (right.length === 0) return left;
	var result: Chess.Coordinate[] = [];
	left.forEach(leftCoord => {
		right.forEach(rightCoord => {
			result.push({ file: leftCoord.file + rightCoord.file, rank: leftCoord.rank + rightCoord.rank });
		});
	});
	return result;
}

export function getIncrementers(singleMove: Chess.SingleMove, isWhite?: boolean): Chess.Coordinate[] {
	var up = {rank: 1, file: 0};
	var down = {rank: -1, file: 0 };
	var left = {rank: 0, file: -1 };
	var right = {rank: 0, file: 1 };
	var upLeft = {rank: 1, file: -1 };
	var upRight = {rank: 1, file: 1 };
	var downLeft = {rank: -1, file: -1 };
	var downRight = {rank: -1, file: 1 };
	switch (singleMove.direction) {
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
