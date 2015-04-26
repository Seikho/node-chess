var types = require("../../types");
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
        case types.Direction.Up:
            return [up];
        case types.Direction.Down:
            return [down];
        case types.Direction.Left:
            return [left];
        case types.Direction.Right:
            return [right];
        case types.Direction.DiagonalUp:
            return [upLeft, upRight];
        case types.Direction.DiagonalDown:
            return [downLeft, downRight];
        case types.Direction.Diagonal:
            return [upLeft, upRight, downLeft, downRight];
        case types.Direction.Horizontal:
            return [left, right];
        case types.Direction.Vertical:
            return [up, down];
        case types.Direction.Lateral:
            return [up, down, left, right];
        default:
            throw "InvalidDirectionException: The direction provided was invalid";
    }
}
module.exports = getTransforms;
//# sourceMappingURL=getTransforms.js.map