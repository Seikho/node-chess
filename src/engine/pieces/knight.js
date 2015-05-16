var horzThenVert = {
    moves: [{ direction: 7 /* Horizontal */, count: 2 }, { direction: 8 /* Vertical */, count: 1 }],
    canJump: true,
    canCapture: true,
    canMove: true
};
var vertThenHorz = {
    moves: [{ direction: 8 /* Vertical */, count: 2 }, { direction: 7 /* Horizontal */, count: 1 }],
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