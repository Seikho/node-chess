var enums = require("../../../../enums");
var Direction = enums.Direction;
var diag = {
    moves: [{ direction: Direction.Diagonal, count: 0 }],
    canJump: false,
    canMove: true,
    canCapture: true
};
var bishop = {
    name: "Bishop",
    movement: [diag],
    canQueen: false,
    canSpawn: true,
    value: 3,
    notation: "b"
};
module.exports = bishop;
//# sourceMappingURL=bishop.js.map