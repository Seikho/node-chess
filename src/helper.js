var Chess = require("./types");
function getSquaresForMove(coordinate, movePattern, isWhite) {
    isWhite = isWhite || true;
    var coordinates = [];
    var moves = movePattern.moves;
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
    switch (direction) {
        case 0 /* Up */:
            return [{ rank: 1, file: 0 }];
        case 1 /* Down */:
            return [{ rank: -1, file: 0 }];
        case 2 /* Left */:
            return [{ rank: 0, file: -1 }];
        case 3 /* Right */:
            return [{ rank: 0, file: 1 }];
        case 4 /* DiagonalUp */:
            return [{ rank: 1, file: -1 }, { rank: 1, file: 1 }];
        case 5 /* DiagonalDown */:
            return [{ rank: -1, file: -1 }, { rank: -1, file: 1 }];
        default:
            throw "InvalidDirectionException: The direction provided was invalid";
    }
}
exports.getIncrementer = getIncrementer;
//# sourceMappingURL=helper.js.map