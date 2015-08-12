function availableMoves(boardState) {
    var self = this;
    var moves = [];
    boardState.ranks.forEach(function (rank) {
        rank.squares.forEach(function (square) {
            moves = moves.concat(self.getMoves({ file: square.file, rank: rank.rank }, boardState));
        });
    });
    boardState.moves = moves;
}
module.exports = availableMoves;
//# sourceMappingURL=availableMoves.js.map