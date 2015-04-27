var getPaths = require("./getPaths");
function getMoves(coordinate) {
    var square = this.getSquare(coordinate);
    var piece = square.piece;
    var bounds = { file: this.fileCount, rank: this.rankCount };
    // No piece, no moves.
    if (!piece)
        return [];
    var pathings = [];
    piece.movement.forEach(function (move) { return pathings = pathings.concat(getPaths(coordinate, move, piece.isWhite, bounds)); });
    var moves = pathings.map(function (pathing) {
        return pathing[pathing.length - 1];
    });
    return moves;
}
// TODO: Implement path validation -- Can a piece move to the end square using this path?
function isValidPath(path, piece, getSquare) {
    return true;
}
module.exports = getMoves;
//# sourceMappingURL=getMoves.js.map