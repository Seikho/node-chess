import Chess = require("../../types");
import getTransforms = require("./getTransforms");
import isInBounds = require("./isInBounds");

export function getIncrements(singleMove: Chess.SingleMove, start: Chess.Coordinate, bounds: Chess.Coordinate, isWhite: boolean): Chess.Coordinate[] {
	var transforms = getTransforms(singleMove, isWhite);

	// If the singleMove defines a fix move, apply it directly to the transforms and return the result.
	if (singleMove.count > 0) {
		var x = singleMove.count;
		return transforms.map(t => { return { file: t.file*x, rank: t.rank*x }; });
	}

	// The move is unbounded, keep applying the transform to 'start' until an edge of the board
	var rank = start.rank;
	var file = start.file;

	var coordinate = { file: start.file, rank: start.rank };
	var increments: Chess.Coordinate[] = [];

	for (var i = 0; i < transforms.length; i++) {
		var increment = transforms[i];
		var inBounds = true;
		var count = 1;

		// Optimization: Do not include any increments that will exceed the bounds of the board
		while (inBounds) {
			var newIncrement = { file: increment.file*count, rank: increment.rank*count };
			inBounds = isInBounds({ file: file+newIncrement.file, rank: rank+newIncrement.rank }, bounds);
			if (isInBounds) increments.push(newIncrement);
			count++;
		}
	}
	return increments;
}
