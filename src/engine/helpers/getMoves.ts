import getIncrements = require("./getIncrements");
import addCoordinates = require("./addCoordinates");
import isInBounds = require("./isInBounds");
import getTransforms = require("./getTransforms");
export = getMoves;

function getMoves(coordinate: Chess.Coordinate): Chess.Coordinate[] {
    var square = this.getSquare(coordinate);
    var piece = square.piece;

    var coordinates: Chess.Coordinate[] = [];

    // No piece, no moves.
    if (!piece) return [];
    piece.movement.forEach(move => coordinates = coordinates.concat(getMovesForMovePattern(coordinate, move, piece.isWhite)));
    return coordinates;
}

function getMovesForMovePattern(coordinate: Chess.Coordinate, movePattern: Chess.MovePattern, isWhite?: boolean, bounds?: Chess.Coordinate): Chess.Coordinate[] {
    isWhite = !!isWhite;
    bounds = bounds || { rank: 8, file: 8 };
    var coordinates: Chess.Coordinate[] = [];

	console.log("Paths for movement pattern: ");
    getPaths(coordinate, movePattern, isWhite, bounds);
	console.log("----------------");

    movePattern.moves.forEach(move => {
        var incrementers = getIncrements(move, coordinate, bounds, isWhite);
        coordinates = addCoordinates(coordinates, incrementers);
    });
    return addCoordinates([coordinate], coordinates).filter(coord => isInBounds(coord, bounds));
}

function getPaths(coordinate: Chess.Coordinate, movePattern: Chess.MovePattern, isWhite: boolean, bounds: Chess.Coordinate) {

    // TODO: Refactor
    var move = movePattern.moves[0];

    var transforms = getTransforms(move, isWhite);
    var pathings = getPathingForTransforms(coordinate, transforms, move.count, bounds);
	if (!movePattern.moves[1]) return pathings;

	transforms = getTransforms(movePattern.moves[1], isWhite);
    var joinedPathings = [];
	for (var p in pathings) {
		var pathing = pathings[p];
		var nextPathings = getPathingForTransforms(pathing[pathing.length - 1], transforms, movePattern.moves[1].count, bounds);
        joinedPathings = joinedPathings.concat(combinePathings(pathing, nextPathings));
	}

    return joinedPathings;
}

function getPathingForTransforms(coordinate: Chess.Coordinate, transforms: Chess.Coordinate[], count: number, bounds: Chess.Coordinate): Array<Chess.Coordinate[]> {
    var paths = [];

    // If the count is 0, return paths for 1 to [bound of the board]
    if (count === 0) {
        var max = Math.max(bounds.file, bounds.rank);
        for (var i = 1; i <= max; i++) {
            paths = paths.concat(getPathingForTransforms(coordinate, transforms, i, bounds));
        }
        return paths;
    }

    // TODO: Refactor
    transforms.forEach(transform => {
        var newPath: Chess.Coordinate[] = [];
        for (var i = 1; i <= count; i++) {
            newPath.push({
                file: coordinate.file + (transform.file * i),
                rank: coordinate.rank + (transform.rank * i)
            });
        }
        if (newPath.every(coord => isInBounds(coord, bounds))) paths.push(newPath);
    });
    return paths;
}

function combinePathings(leftPathings: Chess.Coordinate[], rightPathings: Array<Chess.Coordinate[]>): Array<Chess.Coordinate[]> {
    var pathings: Array<Chess.Coordinate[]> = [];
    rightPathings.forEach(rightPathing => {
        var newPathing = leftPathings.slice(0);
        pathings.push(newPathing.concat(rightPathing));
    });
    return pathings;

}
