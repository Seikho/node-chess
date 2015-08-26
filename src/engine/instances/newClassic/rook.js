var up = makeMove(0, 1);
var down = makeMove(0, -1);
var left = makeMove(-1, 0);
var right = makeMove(1, 0);
function makeMove(file, rank) {
    return {
        canCapture: true,
        canMove: true,
        incrementer: { file: file, rank: rank }
    };
}
var rook = {
    notation: "r",
    name: "Rook",
    movement: [up, down, left, right],
    canQueen: false,
    canSpawn: false,
    value: 5
};
module.exports = rook;
//# sourceMappingURL=rook.js.map