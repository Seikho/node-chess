export = createSquares;

function createSquares() {
    this.ranks = [];
    for (var rank = 0; rank < this.rankCount;rank++) {
        var row: Chess.Rank = {
            rank: rank,
            squares: []
        };

        for (var file = 0; file < this.fileCount;file++) {
            row.squares[file+1] = {
                file: file,
                piece: null,
                availableMoves: [],
                tags: []
            }
        }
        this.ranks[rank+1] = row;
    }
}
