var Board = (function () {
    function Board(ranks, files) {
        if (isNaN(ranks) || isNaN(files))
            throw "InvalidArgumentException: 'ranks' and 'files' must be a number";
        this.rankCount = !!ranks ? Math.floor(Math.abs(ranks)) : 8;
        this.fileCount = !!ranks ? Math.floor(Math.abs(files)) : 8;
    }
    Board.prototype.create = function () {
        this.ranks = [];
        for (var rank = 0; rank < this.rankCount; rank++) {
            var row = {
                rank: rank,
                squares: []
            };
            for (var file = 0; file < this.fileCount; file++) {
                row.squares[file + 1] = {
                    file: file,
                    piece: null
                };
            }
            this.ranks[rank + 1] = row;
        }
    };
    Board.prototype.availableMoves = function (coordinate) {
        var moves = [];
        var square = this.getSquare(coordinate);
        if (!square)
            return moves;
    };
    Board.prototype.movePieceTo = function (fromSquare, toSquare) {
        return false;
    };
    Board.prototype.getSquare = function (square) {
        var x = square.rank;
        var y = square.file;
        if (!this.ranks[x])
            return null;
        return this.ranks[x].squares[y] || null;
    };
    return Board;
})();
module.exports = Board;
//# sourceMappingURL=board.js.map