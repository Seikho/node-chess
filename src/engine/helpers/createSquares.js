function createSquares() {
    this.ranks = [];
    for (var rank = 0; rank < this.rankCount; rank++) {
        var row = {
            rank: rank,
            squares: []
        };
        for (var file = 0; file < this.fileCount; file++) {
            row.squares[file + 1] = {
                file: file,
                piece: null,
                availablePaths: []
            };
        }
        this.ranks[rank + 1] = row;
    }
}
module.exports = createSquares;
//# sourceMappingURL=createSquares.js.map