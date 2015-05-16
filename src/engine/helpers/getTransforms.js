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
module.exports = getTransforms;
//# sourceMappingURL=getTransforms.js.map