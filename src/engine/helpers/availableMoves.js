function availableMoves() {
    var _this = this;
    this.ranks.forEach(function (rank) {
        rank.squares.forEach(function (square) {
            square.availableMoves = _this.availableMoves({ file: square.file, rank: rank.rank });
        });
    });
}
module.exports = availableMoves;
//# sourceMappingURL=availableMoves.js.map