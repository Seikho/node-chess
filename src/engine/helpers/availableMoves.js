function availableMoves(boardState) {
    var self = this;
    boardState.ranks.forEach(function (rank) {
        rank.squares.forEach(function (square) {
            square.availableMoves = self.availableMoves({ file: square.file, rank: rank.rank }, boardState);
        });
    });
}
module.exports = availableMoves;
//# sourceMappingURL=availableMoves.js.map