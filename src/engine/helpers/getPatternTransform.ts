import Chess = require("node-chess");
import enums = require("../../enums");
import Direction = enums.Direction;
export = getTransforms;

function getTransforms(movePattern: Chess.MovePattern, isWhite: boolean): Array<Chess.Coordinate[]> {
	var paths: Array<Chess.Coordinate[]> = [];
	var firstMove = movePattern.moves[0];
	var secondMove = movePattern.moves[1];

	var firstMods = getModifiers(firstMove, isWhite);
	var firstTransforms = applyTransforms(firstMods, firstMove.count);

	if (!secondMove) return [firstTransforms];
	var secondMods = getModifiers(secondMove, isWhite);
	var secondTransforms = applyTransforms(secondMods, secondMove.count);
	firstTransforms.forEach(ft => {
		secondTransforms.forEach(st => {
			paths.push([ft,st]);
		});
	});

	return paths;
}

function applyTransforms(modifiers: Chess.Coordinate[], count: number): Chess.Coordinate[] {
	if (count > 0) {
		var newCoords = modifiers.map(c => { return { file: c.file * count, rank: c.rank * count } });
		return newCoords;
	}

	var coords: Chess.Coordinate[] = [];
	for (var x = 1; x <= 8; x++) {
		coords = coords.concat(applyTransforms(modifiers, x));
	}
	return coords;
}

function getModifiers(singleMove: Chess.SingleMove, isWhite: boolean): Chess.Coordinate[] {
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
	var kingSide = { rank: 0, file: 1 };
	var queenSide = { rank: 0, file: -1 };
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
		case Direction.UpLeft:
			return [upLeft];
		case Direction.UpRight:
			return [upRight];
		case Direction.DownLeft:
			return [downLeft];
		case Direction.DownRight:
			return [downRight];
		case Direction.KingSide:
			return [kingSide];
		case Direction.QueenSide:
			return [queenSide];
		default:
			throw "InvalidDirectionException: The direction provided was invalid";
	}
}
