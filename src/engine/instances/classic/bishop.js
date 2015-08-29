var upLeft = makeMove(-1, 1);
var upRight = makeMove(1, 1);
var downLeft = makeMove(-1, -1);
var downRight = makeMove(1, -1);
function makeMove(file, rank) {
    return {
        canCapture: true,
        canMove: true,
        incrementer: { file: file, rank: rank }
    };
}
var bishop = {
    notation: "b",
    name: "Bishop",
    movement: [upLeft, upRight, downLeft, downRight],
    canQueen: false,
    canSpawn: false,
    value: 3
};
module.exports = bishop;
//# sourceMappingURL=bishop.js.map