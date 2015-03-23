/// <reference path="typings/internal.d.ts" />
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
function applyIncrements(coordinate, incs) {
    var coordinates = [];
    incs.forEach(function (inc) {
        var coord = { rank: coordinate.rank + inc.rank, file: coordinate.file + inc.file };
        if (coord.file > 0 && coord.rank > 0)
            coordinates.push(coord);
    });
    return coordinates;
}
exports.applyIncrements = applyIncrements;
function inverseCoordinates(coordinates) {
    return coordinates.map(function (coord) {
        return { rank: coord.rank *= 1, file: coord.file *= -1 };
    });
}
exports.inverseCoordinates = inverseCoordinates;
function getIncrementer(direction) {
    switch (direction) {
        case board.Direction.Up:
            return [{ rank: 1, file: 0 }];
        case board.Direction.Down:
            return [{ rank: -1, file: 0 }];
        case board.Direction.Left:
            return [{ rank: 0, file: -1 }];
        case bhess.Direction.Right:
            return [{ rank: 0, file: 1 }];
        case bhess.Direction.DiagonalUp:
            return [{ rank: 1, file: -1 }, { rank: 1, file: 1 }];
        case bhess.Direction.DiagonalDown:
            return [{ rank: -1, file: -1 }, { rank: -1, file: 1 }];
        default:
            throw "InvalidDirectionException: The direction provided was invalid";
    }
}
exports.getIncrementer = getIncrementer;
