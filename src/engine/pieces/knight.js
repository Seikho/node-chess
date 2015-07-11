var horzThenVert = {
    moves: [{ direction: Chess.Direction.Horizontal, count: 2 }, { direction: Chess.Direction.Vertical, count: 1 }],
    canJump: true,
    canCapture: true,
    canMove: true
};
var vertThenHorz = {
    moves: [{ direction: Chess.Direction.Vertical, count: 2 }, { direction: Chess.Direction.Horizontal, count: 1 }],
    canJump: true,
    canCapture: true,
    canMove: true
};
var knight = {
    name: "Knight",
    movement: [horzThenVert, vertThenHorz],
    canQueen: false,
    canSpawn: true,
    value: 3,
    notation: "n"
};
module.exports = knight;
//# sourceMappingURL=knight.js.map