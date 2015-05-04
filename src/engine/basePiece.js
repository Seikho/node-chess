var BasePiece = (function () {
    function BasePiece(isWhite) {
        this.name = "";
        this.movement = [];
        this.canQueen = false;
        this.canSpawn = false;
        this.value = 0;
        this.notation = "";
        this.moveHistory = [];
        this.conditionalMoves = [];
        this.isWhite = !!isWhite;
    }
    BasePiece.prototype.getConditionalMoves = function () {
        var movePatterns = [];
        this.conditionalMoves.forEach(function (move) {
            var patterns = move();
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