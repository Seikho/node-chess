function createSquares() {
    var self = this;
    self.boardState.ranks = [];
    for (var rank = 0; rank < self.rankCount; rank++) {
        var row = {
            rank: rank,
            squares: []
        };
        for (var file = 0; file < self.fileCount; file++) {
            row.squares[file + 1] = {
                rank: rank,
                file: file,
                piece: null,
                availableMoves: [],
                tags: []
            };
        }
        self.boardState.ranks[rank + 1] = row;
    }
}
module.exports = createSquares;
//# sourceMappingURL=createSquares.js.map