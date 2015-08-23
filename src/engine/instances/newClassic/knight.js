var upLeft = makeMove(-1, 2);
var upRight = makeMove(1, 2);
var downLeft = makeMove(-1, -2);
var downRight = makeMove(1, -2);
var leftUp = makeMove(-2, 1);
var leftDown = makeMove(-2, -1);
var rightUp = makeMove(2, 1);
var rightDown = makeMove(2, -1);
function makeMove(file, rank) {
    return {
        canCapture: true,
        canMove: true,
        transforms: { file: file, rank: rank }
    };
}
var knight = {
    name: "Knight",
    movement: [upLeft, upRight, downLeft, downRight, leftUp, leftDown, rightUp, rightDown],
    canQueen: false,
    canSpawn: true,
    value: 3,
    notation: "k"
};
module.exports = knight;
//# sourceMappingURL=knight.js.map