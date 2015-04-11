var getIncrements = require("./getIncrements");
var addCoordinates = require("./addCoordinates");
var isInBounds = require("./isInBounds");
function getMoves(coordinate, piece) {
    var coordinates = [];
    if (!piece)
        return [];
    piece.movement.forEach(function (move) { return coordinates = coordinates.concat(getMovesForMovePattern(coordinate, move, piece.isWhite)); });
    return coordinates;
}
function getMovesForMovePattern(coordinate, movePattern, isWhite, bounds) {
    isWhite = !!isWhite;
    bounds = bounds || { rank: 8, file: 8 };
    var coordinates = [];
    movePattern.moves.forEach(function (move) {
        var incrementers = getIncrements(move, coordinate, bounds, isWhite);
        coordinates = addCoordinates(coordinates, incrementers);
    });
    return addCoordinates([coordinate], coordinates).filter(function (coord) { return isInBounds(coord, bounds); });
}
//# sourceMappingURL=getMoves.js.map