var getTransforms = require("./getTransforms");
function getPaths(coordinate, movePattern, isWhite) {
    // TODO: Refactor
    var move = movePattern.moves[0];
    var transforms = getTransforms(move, isWhite);
    var pathings = getPathingForTransforms(coordinate, transforms, move.count);
    // No further work is necessary for movePatterns with one move.
    if (!movePattern.moves[1])
        return pathings;
    transforms = getTransforms(movePattern.moves[1], isWhite);
    var joinedPathings = [];
    for (var p in pathings) {
        var pathing = pathings[p];
        var lastCoordinateInPath = pathing[pathing.length - 1];
        // We need every permutation of originalPathing + newPathing.
        var nextPathings = getPathingForTransforms(lastCoordinateInPath, transforms, movePattern.moves[1].count);
        joinedPathings = joinedPathings.concat(combinePathings(pathing, nextPathings));
    }
    return joinedPathings;
}
function getPathingForTransforms(coordinate, transforms, count) {
    var paths = [];
    // If the count is 0, return paths for 1 to [bound of the board]
    if (count === 0) {
        for (var i = 1; i <= 8; i++) {
            paths = paths.concat(getPathingForTransforms(coordinate, transforms, i));
        }
        return paths;
    }
    // TODO: Refactor
    // Incrementally apply the transform to create a 'path' 
    transforms.forEach(function (transform) {
        var newPath = [];
        for (var i = 1; i <= count; i++) {
            newPath.push({
                file: coordinate.file + (transform.file * i),
                rank: coordinate.rank + (transform.rank * i)
            });
        }
        // Only return the path if every coordinate in the path is within the bounds of the board
        if (newPath.every(function (coord) { return isInBounds(coord); }))
            paths.push(newPath);
    });
    return paths;
}
function combinePathings(leftPathings, rightPathings) {
    var pathings = [];
    rightPathings.forEach(function (rightPathing) {
        var newPathing = leftPathings.slice(0);
        pathings.push(newPathing.concat(rightPathing));
    });
    return pathings;
}
// Optimisation: Boards are fixed 8x8
function isInBounds(coordinate) {
    return coordinate.file > 0 && coordinate.file <= 8
        && coordinate.rank > 0 && coordinate.rank <= 8;
}
module.exports = getPaths;
//# sourceMappingURL=getPaths.js.map