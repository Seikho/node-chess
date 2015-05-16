export = getTransforms;

function getTransforms(singleMove: Chess.SingleMove, isWhite: boolean): Chess.Coordinate[] {
	// Return the inverse of the transform if from black perspective
	var x = isWhite ? 1 : -1;
	var up = { rank: 1 * x, file: 0 };
	var down = { rank: -1 * x, file: 0 };
	var left = { rank: 0, file: -1 * x };
	var right = { rank: 0, file: 1 * x };
	var upLeft = { rank: 1 * x, file: -1 * x };
	var upRight = { rank: 1 * x, file: 1 * x };
	var downLeft = { rank: -1 * x, file: -1 * x };
	var downRight = { rank: -1 * x, file: 1 * x };

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
		case Chess.Direction.DiagonalUpLeft:
			return [upLeft];
		case Chess.Direction.DiagonalUpRight:
			return [upRight];
		case Chess.Direction.DiagonalDownLeft:
			return [downLeft];
		case Chess.Direction.DiagonalDownRight:
			return [downRight];
		default:
			throw "InvalidDirectionException: The direction provided was invalid";
	}
}
