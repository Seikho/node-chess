function getSquaresForMove(coordinate, movePattern, isWhite) {
    isWhite = isWhite || true;
    var coordinates = [];
    var moves = movePattern.moves;
    if (moves.length > 2)
        return coordinates;
    if (moves.length === 2) {
        if (moves[0].count === 0 && moves[1].count === 0)
            return coordinates;
        var incLeft = this.getIncrementer(moves[0].direction);
        var incRight = this.getIncrementer(moves[1].direction);
        if (!isWhite) {
            incLeft = this.inverseCoordinates(incLeft);
            incRight = this.inverseCoordinates(incRight);
        }
        if (moves[0].count !== 0 && moves[1].count !== 0) {
        }
    }
    movePattern.moves.forEach(function (singleMove) {
    });
}
exports.getSquaresForMove = getSquaresForMove;
function getSquareForMoves(coordinate, movePatterns) {
    var _this = this;
    var coordinates = [];
    movePatterns.forEach(function (move) { return coordinates.concat(_this.getSquaresForMove(coordinate, move)); });
    return coordinates;
}
exports.getSquareForMoves = getSquareForMoves;
function inverseCoordinates(coordinates) {
    return coordinates.map(function (coord) {
        return { rank: coord.rank *= 1, file: coord.file *= -1 };
    });
}
exports.inverseCoordinates = inverseCoordinates;
function getIncrementer(direction) {
    switch (direction) {
        case Chess.Direction.Up:
            return [{ rank: 1, file: 0 }];
        case Chess.Direction.Down:
            return [{ rank: -1, file: 0 }];
        case Chess.Direction.Left:
            return [{ rank: 0, file: -1 }];
        case Chess.Direction.Right:
            return [{ rank: 0, file: 1 }];
        case Chess.Direction.DiagonalUp:
            return [{ rank: 1, file: -1 }, { rank: 1, file: 1 }];
        case Chess.Direction.DiagonalDown:
            return [{ rank: -1, file: -1 }, { rank: -1, file: 1 }];
        default:
            throw "InvalidDirectionException: The direction provided was invalid";
    }
}
exports.getIncrementer = getIncrementer;
//# sourceMappingURL=helper.js.map