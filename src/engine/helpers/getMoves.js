var getIncrements = require("./getIncrements");
var addCoordinates = require("./addCoordinates");
var isInBounds = require("./isInBounds");
var getTransforms = require("./getTransforms");
function getMoves(coordinate) {
    var square = this.getSquare(coordinate);
    var piece = square.piece;
    var coordinates = [];
    // No piece, no moves.
    if (!piece)
        return [];
    piece.movement.forEach(function (move) { return coordinates = coordinates.concat(getMovesForMovePattern(coordinate, move, piece.isWhite)); });
    return coordinates;
}
function getMovesForMovePattern(coordinate, movePattern, isWhite, bounds) {
    isWhite = !!isWhite;
    bounds = bounds || { rank: 8, file: 8 };
    var coordinates = [];
    console.log("Paths for movement pattern: ");
    getPaths(coordinate, movePattern, isWhite, bounds);
    console.log("----------------");
    movePattern.moves.forEach(function (move) {
        var incrementers = getIncrements(move, coordinate, bounds, isWhite);
        coordinates = addCoordinates(coordinates, incrementers);
    });
    return addCoordinates([coordinate], coordinates).filter(function (coord) { return isInBounds(coord, bounds); });
}
function getPaths(coordinate, movePattern, isWhite, bounds) {
    console.log(movePattern);
    console.log("");
    var move = movePattern.moves[0];
    if (move.count === 0)
        return;
    var transforms = getTransforms(move, isWhite);
    var pathings = getPathingForTransforms(coordinate, transforms, move.count);
    if (!movePattern.moves[1])
        return pathings;
    transforms = getTransforms(movePattern.moves[1], isWhite);
    var joinedPathings = [];
    for (var p in pathings) {
        var pathing = pathings[p];
        var nextPathings = getPathingForTransforms(pathing[pathing.length - 1], transforms, movePattern.moves[1].count);
        joinedPathings = joinedPathings.concat(combinePathings(pathing, nextPathings));
    }
    console.log(joinedPathings);
}
function getPathingForTransforms(coordinate, transforms, count) {
    var paths = [];
    transforms.forEach(function (transform) {
        var newPath = [];
        for (var i = 1; i <= count; i++) {
            newPath.push({
                file: coordinate.file + (transform.file * i),
                rank: coordinate.rank + (transform.rank * i)
            });
        }
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
module.exports = getMoves;
//# sourceMappingURL=getMoves.js.map