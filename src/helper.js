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
    var coordinates = [];
    var moves = movePattern.moves;
    bounds = bounds || { rank: 8, file: 8 };
    var moveArrays = [];
    for (var s in moves) {
        var sm = moves[s];
        var incs = getIncrementer(sm.direction);
        moveArrays.push(applyCounts(coordinate, incs, sm.count, isWhite, bounds));
    }
    var addCoords = [];
    if (moveArrays.length === 1)
        coordinates = moveArrays[0];
    else {
        moveArrays[0].forEach(function (m1) {
            moveArrays[1].forEach(function (m2) {
                addCoords.push({ rank: m1.rank + m2.rank, file: m1.file + m2.file });
            });
        });
    }
    return coordinates;
}
exports.getSquaresForMove = getSquaresForMove;
function applyCounts(coordinate, incrementers, count, isWhite, bounds) {
    var inverser = isWhite ? 1 : -1;
    var returnCoords = [];
    if (count > 0) {
        incrementers.forEach(function (inc) {
            inc.file *= (count * inverser);
            inc.rank *= (count * inverser);
            var newCoord = { rank: coordinate.rank + inc.rank, file: coordinate.file + inc.file };
            if (isInBounds(newCoord, bounds))
                returnCoords.push(newCoord);
        });
        return returnCoords;
    }
    var count = 1;
    for (var i in incrementers) {
        var inc = incrementers[i];
        var newCoord = { rank: bounds.rank, file: bounds.file };
        var count = 1;
        while (isInBounds(newCoord, bounds)) {
            var newInc = { rank: inc.rank *= count, file: inc.file *= count };
            newCoord = { rank: coordinate.rank + newInc.rank, file: coordinate.file + newInc.file };
            if (isInBounds(newCoord, bounds))
                returnCoords.push({ rank: newCoord.rank, file: newCoord.file });
            count++;
        }
    }
    return returnCoords;
}
exports.applyCounts = applyCounts;
function isInBounds(coordinate, bounds) {
    return coordinate.rank <= bounds.rank && coordinate.file <= bounds.file;
}
exports.isInBounds = isInBounds;
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