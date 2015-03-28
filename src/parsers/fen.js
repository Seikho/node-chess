var FenParser = (function () {
    function FenParser(board) {
        this.board = board;
    }
    FenParser.prototype.parse = function (position) {
        var info = position.match(/[a-z|A-Z|0-9]*[^/\s]/g);
        return null;
    };
    return FenParser;
})();
//# sourceMappingURL=fen.js.map