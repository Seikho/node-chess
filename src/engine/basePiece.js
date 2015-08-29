var BasePiece = (function () {
    function BasePiece(piece, notation) {
        var _this = this;
        this.id = 0;
        this.getRelativeDestination = function (transform) {
            var destination = applyTransform(transform, _this.location, _this.isWhite);
            return destination;
        };
        this.getAbsoluteDestination = function (transform) {
            var destination = applyTransform(transform, _this.location, true);
            return destination;
        };
        this.isWhite = notation === piece.notation.toUpperCase();
        this.name = piece.name;
        this.movement = piece.movement;
        this.canQueen = piece.canQueen;
        this.canSpawn = piece.canSpawn;
        this.value = piece.value;
        this.notation = notation;
        this.moveHistory = [];
        this.postMoveFunctions = piece.postMoveFunctions || [];
    }
    return BasePiece;
})();
function applyTransform(transform, position, isWhite) {
    var modifier = isWhite ? 1 : -1;
    return {
        file: position.file + (transform.file * modifier),
        rank: position.rank + (transform.rank * modifier)
    };
}
function modifyTransform(transform, count) {
    return {
        file: transform.file * count,
        rank: transform.rank * count
    };
}
module.exports = BasePiece;
//# sourceMappingURL=basePiece.js.map