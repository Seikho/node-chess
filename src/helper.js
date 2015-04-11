var Chess = require("./types");
function getSquaresForMoves(coordinate, piece) {
    var coordinates = [];
    if (!piece)
        return [];
    piece.movement.forEach(function (move) { return coordinates = coordinates.concat(getSquaresForMove(coordinate, move, piece.isWhite)); });
    return coordinates;
}
exports.getSquaresForMoves = getSquaresForMoves;
function getSquaresForMove(coordinate, movePattern, isWhite, bounds) {
    isWhite = !!isWhite;
    bounds = bounds || { rank: 8, file: 8 };
    var coordinates = [];
    movePattern.moves.forEach(function (move) {
        var incrementers = getIncrements(move, coordinate, bounds, isWhite);
        coordinates = addMatrices(coordinates, incrementers);
    });
    return addMatrices([coordinate], coordinates).filter(function (coord) { return isInBounds(coord, bounds); });
}
exports.getSquaresForMove = getSquaresForMove;
function isInBounds(coordinate, bounds) {
    return coordinate.rank <= bounds.rank && coordinate.file <= bounds.file && coordinate.rank > 0 && coordinate.file > 0;
}
exports.isInBounds = isInBounds;
function addMatrices(left, right, bounds) {
    // Return N | N*M -- whichever is greater
    if (left.length === 0)
        return right;
    if (right.length === 0)
        return left;
    var result = [];
    left.forEach(function (leftCoord) {
        right.forEach(function (rightCoord) {
            result.push({ file: leftCoord.file + rightCoord.file, rank: leftCoord.rank + rightCoord.rank });
        });
    });
    return result;
}
exports.addMatrices = addMatrices;
function getIncrements(singleMove, start, bounds, isWhite) {
    var transforms = getTransforms(singleMove, isWhite);
    // If the singleMove defines a fix move, apply it directly to the transforms and return the result.
    if (singleMove.count > 0) {
        var x = singleMove.count;
        return transforms.map(function (t) { return { file: t.file * x, rank: t.rank * x }; });
    }
    // The move is unbounded, keep applying the transform to 'start' until an edge of the board
    var rank = start.rank;
    var file = start.file;
    var coordinate = { file: start.file, rank: start.rank };
    var increments = [];
    for (var i = 0; i < transforms.length; i++) {
        var increment = transforms[i];
        var inBounds = true;
        var count = 1;
        // Optimization: Do not include any increments that will exceed the bounds of the board
        while (inBounds) {
            var newIncrement = { file: increment.file * count, rank: increment.rank * count };
            inBounds = isInBounds({ file: file + newIncrement.file, rank: rank + newIncrement.rank }, bounds);
            if (isInBounds)
                increments.push(newIncrement);
            count++;
        }
    }
    return increments;
}
exports.getIncrements = getIncrements;
function getTransforms(singleMove, isWhite) {
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
        default:
            throw "InvalidDirectionException: The direction provided was invalid";
    }
}
exports.getTransforms = getTransforms;
//# sourceMappingURL=helper.js.map