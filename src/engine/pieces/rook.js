var enums = require("../../enums");
var Direction = enums.Direction;
var lat = {
    moves: [{ direction: Direction.Lateral, count: 0 }],
    canJump: false,
    canCapture: true,
    canMove: true
};
var rook = {
    name: "Rook",
    movement: [lat],
    canQueen: false,
    canSpawn: true,
    value: 5,
    notation: "r"
};
module.exports = rook;
//# sourceMappingURL=rook.js.map