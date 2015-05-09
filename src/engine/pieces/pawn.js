var Direction = require("../../direction");
var firstMovePattern = {
    moves: [{ direction: Direction.Up, count: 2 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var firstMove = function (piece) {
    if (piece.moveHistory.length === 0)
        return firstMovePattern;
    return null;
};
var moveForward = {
    moves: [{ direction: Direction.Up, count: 1 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var moveCapture = {
    moves: [{ direction: Direction.DiagonalUp, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false
};
var forward = {
    direction: Direction.Up,
    count: 1
};
var pawn = {
    name: "Pawn",
    movement: [moveForward, moveCapture],
    canQueen: true,
    canSpawn: false,
    value: 1,
    conditionalMoves: [firstMove],
    notation: "p"
};
module.exports = pawn;
//# sourceMappingURL=pawn.js.map