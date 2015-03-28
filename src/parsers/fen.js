var FenParser = (function () {
    function FenParser(board) {
        this.board = board;
    }
    FenParser.prototype.parse = function (position) {
        //TODO Implement fen string parser, return a board
        // Only accept 8x8 board?
        // This will split a FEN string into an array. First 8 indexes are ranks of the board, descending from rank 8 t rank 1.
        var info = position.match(/[a-z|A-Z|0-9]*[^/\s]/g);
        for (var i = 1; i <= this.board.rankCount; i++)
            this.board.ranks[i] = this.createFilesForRank(info[i - 1], i);
    };
    FenParser.prototype.createFilesForRank = function (fenRank, rankNumber) {
        var rank = {
            rank: rankNumber,
            squares: []
        };
        for (var i = 1; i <= this.board.fileCount; i++) {
            var notation = fenRank[i];
            var notationNumber = parseInt(notation);
            // If the notation is a number, that many squares from this square contain no piece.
            // TODO Consider refactoring--export to function for readability
            if (!isNaN(notationNumber)) {
                // Insert the next notation after the blank squares. 
                if (!!fenRank[i + 1])
                    fenRank[i + notationNumber] = fenRank[i + 1];
                for (var j = i; j < i + notationNumber; j++)
                    rank.squares.push({ file: j, piece: null });
                i += notationNumber - 1;
                continue;
            }
            rank.squares[i] = {
                file: i,
                piece: this.getPiece(notation)
            };
        }
        return rank;
    };
    FenParser.prototype.getPiece = function (notation) {
        var pieceFactory = this.board.pieces.filter(function (p) { return p.notation === notation.toLowerCase(); });
        return pieceFactory.length === 0 ? null : pieceFactory[0].create(pieceFactory[0].notation !== notation.toLowerCase());
    };
    return FenParser;
})();
//# sourceMappingURL=fen.js.map