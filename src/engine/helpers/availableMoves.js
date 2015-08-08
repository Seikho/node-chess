function availableMoves() {
    var self = this;
    self.boardState.ranks.forEach(function (rank) {
        rank.squares.forEach(function (square) {
            square.availableMoves = self.availableMoves({ file: square.file, rank: rank.rank });
        });
    });
}
module.exports = availableMoves;
//# sourceMappingURL=availableMoves.js.map