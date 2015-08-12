function getMoves(coordinate, boardState) {
    var self = this;
    boardState = boardState || self.boardState;
    return boardState.moves
        .filter(function (move) { return move.from.file === coordinate.file && move.from.rank === coordinate.rank; });
}
module.exports = getMoves;
//# sourceMappingURL=getMoves.js.map