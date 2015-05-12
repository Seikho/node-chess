var BasePiece = (function () {
    function BasePiece(piece, notation) {
        this.isWhite = notation === piece.notation.toUpperCase();
        this.name = piece.name;
        this.movement = piece.movement;
        this.canQueen = piece.canQueen;
        this.canSpawn = piece.canSpawn;
        this.value = piece.value;
        this.notation = notation;
        this.conditionalMoves = piece.conditionalMoves || [];
        this.moveHistory = [];
    }
    BasePiece.prototype.getConditionalMoves = function (board) {
        var _this = this;
        var movePatterns = [];
        this.conditionalMoves.forEach(function (move) {
            var patterns = move(_this, board);
            if (!patterns)
                return;
            movePatterns = movePatterns.concat(patterns);
        });
        return movePatterns;
    };
    BasePiece.prototype.makeConditionalMove = function (condition, patterns) {
        return function () {
            if (condition())
                return patterns;
        };
    };
    return BasePiece;
})();
module.exports = BasePiece;
//# sourceMappingURL=basePiece.js.map