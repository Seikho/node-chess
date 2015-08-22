var enums = require("../../enums");
var Direction = enums.Direction;
function getTransforms(movePattern, isWhite) {
    var paths = [];
    var firstMove = movePattern.moves[0];
    var secondMove = movePattern.moves[1];
    var firstMods = getModifiers(firstMove, isWhite);
    var firstTransforms = applyTransforms(firstMods, firstMove.count);
    if (!secondMove)
        return firstTransforms.map(function (ft) { return [ft]; });
    var secondMods = getModifiers(secondMove, isWhite);
    var secondTransforms = applyTransforms(secondMods, secondMove.count);
    firstTransforms.forEach(function (ft) {
        secondTransforms.forEach(function (st) {
            paths.push([ft, st]);
        });
    });
    return paths;
}
function applyTransforms(modifiers, count) {
    if (count > 0) {
        var newCoords = modifiers.map(function (c) { return { file: c.file * count, rank: c.rank * count }; });
        return newCoords;
    }
    var coords = [];
    for (var x = 1; x <= 8; x++) {
        coords = coords.concat(applyTransforms(modifiers, x));
    }
    return coords;
}
function getModifiers(singleMove, isWhite) {
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
    var kingSide = { rank: 0, file: 1 };
    var queenSide = { rank: 0, file: -1 };
    switch (singleMove.direction) {
        case Direction.Up:
            return [up];
        case Direction.Down:
            return [down];
        case Direction.Left:
            return [left];
        case Direction.Right:
            return [right];
        case Direction.DiagonalUp:
            return [upLeft, upRight];
        case Direction.DiagonalDown:
            return [downLeft, downRight];
        case Direction.Diagonal:
            return [upLeft, upRight, downLeft, downRight];
        case Direction.Horizontal:
            return [left, right];
        case Direction.Vertical:
            return [up, down];
        case Direction.Lateral:
            return [up, down, left, right];
        case Direction.UpLeft:
            return [upLeft];
        case Direction.UpRight:
            return [upRight];
        case Direction.DownLeft:
            return [downLeft];
        case Direction.DownRight:
            return [downRight];
        case Direction.KingSide:
            return [kingSide];
        case Direction.QueenSide:
            return [queenSide];
        default:
            throw "InvalidDirectionException: The direction provided was invalid";
    }
}
module.exports = getTransforms;
//# sourceMappingURL=getPatternTransform.js.map