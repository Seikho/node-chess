function availableMoves(boardState) {
    var self = this;
    boardState = boardState || self.boardState;
    var moves = [];
    boardState.ranks.forEach(function (rank) {
        rank.squares.forEach(function (square) {
            moves = moves.concat(self.inferMoves({ file: square.file, rank: rank.rank }, boardState));
        });
    });
    boardState.moves = moves;
}
module.exports = availableMoves;
//# sourceMappingURL=availableMoves.js.map