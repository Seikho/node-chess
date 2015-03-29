var Chess = require("./types");
function getSquaresForMove(coordinate, movePattern, isWhite) {
    isWhite = isWhite || true;
    var coordinates = [];
    var moves = movePattern.moves;
    // Can only provide two (2) single moves. Providing more makes no logical sense
    // An error will get thrown to explicitly disallow this
    if (moves.length > 2)
        return coordinates;
    if (moves.length === 2) {
        if (moves[0].count === 0 && moves[1].count === 0)
            return coordinates;
        var incLeft = getIncrementer(moves[0].direction);
        var incRight = getIncrementer(moves[1].direction);
        if (!isWhite) {
            incLeft = inverseCoordinates(incLeft);
            incRight = inverseCoordinates(incRight);
        }
        /// Invalid move definition: Cannot have infinte moves in both directions -- This limit will be removed
        if (moves[0].count !== 0 && moves[1].count !== 0) {
        }
    }
    movePattern.moves.forEach(function (singleMove) {
    });
    return coordinates;
}
exports.getSquaresForMove = getSquaresForMove;
function getSquareForMoves(coordinate, movePatterns) {
    var coordinates = [];
    movePatterns.forEach(function (move) { return coordinates.concat(getSquaresForMove(coordinate, move)); });
    return coordinates;
}
exports.getSquareForMoves = getSquareForMoves;
function applyIncrements(coordinate, incs, bounds) {
    bounds = bounds || { rank: 8, file: 8 };
    var originalCoordinate = {
        rank: coordinate.rank,
        file: coordinate.file
    };
    var coordinates = [];
    for (var i = 0; i < incs.length; i++) {
        var inc = incs[i];
        var coord = { rank: coordinate.rank + inc.rank, file: coordinate.file + inc.file };
        if (coord.file > 0 && coord.file <= bounds.file && coord.rank > 0 && coord.rank <= bounds.rank) {
            coordinate = coord;
        }
        else
            return originalCoordinate;
    }
    return coordinate;
}
exports.applyIncrements = applyIncrements;
function inverseCoordinates(coordinates) {
    return coordinates.map(function (coord) {
        return { rank: coord.rank *= -1, file: coord.file *= -1 };
    });
}
exports.inverseCoordinates = inverseCoordinates;
function singleMovesToIncrements(moves) {
    var coordinates = [];
    moves.forEach(function (move) {
        var inc = getIncrementer(move.direction);
        inc[0].rank *= move.count;
        inc[0].file *= move.count;
        coordinates.push(inc[0]);
    });
    return coordinates;
}
exports.singleMovesToIncrements = singleMovesToIncrements;
function getIncrementer(direction) {
    var up = { rank: 1, file: 0 };
    var down = { rank: -1, file: 0 };
    var left = { rank: 0, file: -1 };
    var right = { rank: 0, file: 1 };
    var upLeft = { rank: 1, file: -1 };
    var upRight = { rank: 1, file: 1 };
    var downLeft = { rank: -1, file: -1 };
    var downRight = { rank: -1, file: 1 };
    switch (direction) {
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
exports.getIncrementer = getIncrementer;
//# sourceMappingURL=helper.js.map