var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
    Direction[Direction["DiagonalUp"] = 4] = "DiagonalUp";
    Direction[Direction["DiagonalDown"] = 5] = "DiagonalDown";
    Direction[Direction["Lateral"] = 6] = "Lateral";
    Direction[Direction["Horizontal"] = 7] = "Horizontal";
    Direction[Direction["Vertical"] = 8] = "Vertical";
    Direction[Direction["Diagonal"] = 9] = "Diagonal";
})(Direction || (Direction = {}));
module.exports = Direction;
//# sourceMappingURL=direction.js.map