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
        var incrementers = getMoves(move, coordinate, bounds, isWhite);
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
function getMoves(singleMove, start, bounds, isWhite) {
    var rank = start.rank;
    var file = start.file;
    var increments = getIncrementers(singleMove, isWhite);
    // Bounded moves only require a simple transform
    if (singleMove.count > 0)
        return increments.map(function (i) { return transform(start, i, singleMove.count); });
    var finalIncrements = [];
    for (var i = 0; i < increments.length; i++) {
        var inc = increments[i];
        var inBounds = true;
        var count = 1;
        while (inBounds) {
            var newIncrement = { file: inc.file * count, rank: inc.rank * count };
            inBounds = isInBounds({ file: file + newIncrement.file, rank: rank + newIncrement.rank }, bounds);
            if (isInBounds)
                finalIncrements.push(newIncrement);
            count++;
        }
    }
    return finalIncrements;
}
exports.getMoves = getMoves;
function getIncrementers(singleMove, isWhite) {
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
        case 0 /* Up */:
            return [up];
        case 1 /* Down */:
            return [down];
        case 2 /* Left */:
            return [left];
        case 3 /* Right */:
            return [right];
        case 4 /* DiagonalUp */:
            return [upLeft, upRight];
        case 5 /* DiagonalDown */:
            return [downLeft, downRight];
        case 9 /* Diagonal */:
            return [upLeft, upRight, downLeft, downRight];
        case 7 /* Horizontal */:
            return [left, right];
        case 8 /* Vertical */:
            return [up, down];
        case 6 /* Lateral */:
            return [up, down, left, right];
        default:
            throw "InvalidDirectionException: The direction provided was invalid";
    }
}
exports.getIncrementers = getIncrementers;
/**
* Will return a new coordinate after applying a simple multiplier transform to each index
*/
function transform(coordinate, incrementer, factor) {
    return { file: coordinate.file + (incrementer.file * factor), rank: coordinate.rank + (incrementer.rank * factor) };
}
//# sourceMappingURL=helper.js.map