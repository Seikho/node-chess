var FenParser = (function () {
    function FenParser(board) {
        this.board = board;
    }
    FenParser.prototype.parse = function (position) {
        //TODO Implement fen string parser, return a board
        // Only accept 8x8 board?
        // This will split a FEN string into an array. First 8 indexes are ranks of the board, descending from rank 8 t rank 1.
        var info = position.match(/[a-z|A-Z|0-9]*[^/\s]/g);
        return null;
    };
    return FenParser;
})();
//# sourceMappingURL=fen.js.map