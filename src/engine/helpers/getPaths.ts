import Chess = require("node-chess");
import isInBounds = require("./isInBounds");
import getTransforms = require("./getTransforms");
export = getPaths;

function getPaths(coordinate: Chess.Coordinate, movePattern: Chess.MovePattern, isWhite: boolean, bounds: Chess.Coordinate): Chess.Coordinate[][] {
    // TODO: Refactor
    var move = movePattern.moves[0];

    var transforms = getTransforms(move, isWhite);
    var pathings = getPathingForTransforms(coordinate, transforms, move.count, bounds);

    // No further work is necessary for movePatterns with one move.
    if (!movePattern.moves[1]) return pathings;

    transforms = getTransforms(movePattern.moves[1], isWhite);
    var joinedPathings: Chess.Coordinate[][] = [];
    for (var p in pathings) {
        var pathing = pathings[p];

        var lastCoordinateInPath = pathing[pathing.length - 1];

        // We need every permutation of originalPathing + newPathing.
        var nextPathings = getPathingForTransforms(lastCoordinateInPath, transforms, movePattern.moves[1].count, bounds);
        joinedPathings = joinedPathings.concat(combinePathings(pathing, nextPathings));
    }
    return joinedPathings;
}

function getPathingForTransforms(coordinate: Chess.Coordinate, transforms: Chess.Coordinate[], count: number, bounds: Chess.Coordinate): Array<Chess.Coordinate[]> {
    var paths = [];

    // If the count is 0, return paths for 1 to [bound of the board]
    if (count === 0) {
        // Get a sensible 'count' value
        var max = Math.max(bounds.file, bounds.rank);
        for (var i = 1; i <= max; i++) {
            paths = paths.concat(getPathingForTransforms(coordinate, transforms, i, bounds));
        }
        return paths;
    }

    // TODO: Refactor
    // Incrementally apply the transform to create a 'path' 
    transforms.forEach(transform => {
        var newPath: Chess.Coordinate[] = [];
        for (var i = 1; i <= count; i++) {
            newPath.push({
                file: coordinate.file + (transform.file * i),
                rank: coordinate.rank + (transform.rank * i)
            });
        }
        // Only return the path if every coordinate in the path is within the bounds of the board
        if (newPath.every(coord => isInBounds(coord, bounds))) paths.push(newPath);
    });
    return paths;
}

function combinePathings(leftPathings: Chess.Coordinate[], rightPathings: Chess.Coordinate[][]): Array<Chess.Coordinate[]> {
    var pathings: Array<Chess.Coordinate[]> = [];
    rightPathings.forEach(rightPathing => {
        var newPathing = leftPathings.slice(0);
        pathings.push(newPathing.concat(rightPathing));
    });
    return pathings;

}
