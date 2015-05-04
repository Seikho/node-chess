var BasePiece = (function () {
    function BasePiece() {
        this.name = "";
        this.movement = [];
        this.canQueen = false;
        this.canSpawn = false;
        this.value = 0;
        this.notation = "";
        this.moveHistory = [];
        this.conditionalMoves = [];
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
    return BasePiece;
})();
module.exports = BasePiece;
//# sourceMappingURL=basePiece.js.map