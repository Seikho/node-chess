var lat = {
    moves: [{ direction: Chess.Direction.Lateral, count: 0 }],
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