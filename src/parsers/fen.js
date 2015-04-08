var fenStringParser = require("./stringParsers/fen");
var FenParser = (function () {
    function FenParser(parentBoard) {
        this.defaultPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        this.parentBoard = parentBoard;
    }
    FenParser.prototype.parse = function (position) {
        //TODO Implement fen string parser, return a board
        // Only accept 8x8 board?
        var _this = this;
        // This will split a FEN string into an array. First 8 indexes are ranks of the board, descending from rank 8 t rank 1.
        this.boardInput = fenStringParser.parse(position);
        // Fen strings start from the 8th rank, so we start from 8 and descend to rank 1.
        var rankCount = this.parentBoard.rankCount;
        this.boardInput.ranks.forEach(function (rank) {
            _this.parentBoard.ranks[rankCount] = _this.createFilesForRank(rank, rankCount);
            rankCount--;
        });
    };
    FenParser.prototype.createFilesForRank = function (fenRank, rankNumber) {
        var rank = {
            rank: rankNumber,
            squares: []
        };
        for (var i = 1; i <= this.parentBoard.fileCount; i++) {
            var notation = fenRank[i - 1];
            var notationNumber = parseInt(notation);
            // If the notation is a number, that many squares from this square contain no piece.
            // TODO Consider refactoring--export to function for readability
            if (!isNaN(notationNumber)) {
                // Insert the next notation after the blank squares. 
                if (!!fenRank[i + 1])
                    fenRank[i + notationNumber] = fenRank[i + 1];
                // Insert blank squares from the current square, to currentSquare+notationNumber.
                for (var j = i; j < i + notationNumber; j++)
                    rank.squares.push({ file: j, piece: null });
                i += notationNumber - 1;
                continue;
            }
            var square = {
                file: i,
                piece: this.getPiece(notation)
            };
            square.piece.originalPosition = { rank: rank.rank, file: i };
            rank.squares[i] = square;
        }
        return rank;
    };
    FenParser.prototype.getPiece = function (notation) {
        var pieceFactory = this.parentBoard.pieces.filter(function (p) { return p.notation.toUpperCase() === notation || p.notation.toLowerCase() === notation; });
        return pieceFactory.length === 0
            ? null
            : pieceFactory[0].create(pieceFactory[0].notation.toUpperCase() === notation);
    };
    return FenParser;
})();
module.exports = FenParser;
//# sourceMappingURL=fen.js.map