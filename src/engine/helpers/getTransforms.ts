import Direction = require("../../direction");
export = getTransforms;

function getTransforms(singleMove: Chess.SingleMove, isWhite: boolean): Chess.Coordinate[] {
	// Return the inverse of the transform if from black perspective
	var x = isWhite?1:-1;
	var up = {rank: 1*x, file: 0};
	var down = {rank: -1*x, file: 0 };
	var left = {rank: 0, file: -1*x };
	var right = {rank: 0, file: 1*x };
	var upLeft = {rank: 1*x, file: -1*x };
	var upRight = {rank: 1*x, file: 1*x };
	var downLeft = {rank: -1*x, file: -1*x };
	var downRight = {rank: -1*x, file: 1*x };

	switch (singleMove.direction) {
		case Direction.Up:
			return [up];
		case Direction.Down:
			return [down];
		case Direction.Left:
			return [left];
		case Direction.Right:
			return [right];
		case Direction.DiagonalUp:
			return [upLeft, upRight];
		case Direction.DiagonalDown:
			return [downLeft, downRight];
		case Direction.Diagonal:
			return [upLeft, upRight, downLeft, downRight];
		case Direction.Horizontal:
			return [left, right];
		case Direction.Vertical:
			return [up, down];
		case Direction.Lateral:
			return [up, down, left, right];
		default:
			throw "InvalidDirectionException: The direction provided was invalid";
	}
}
