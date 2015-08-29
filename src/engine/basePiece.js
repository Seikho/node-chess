var BasePiece = (function () {
    function BasePiece(piece, notation) {
        this.id = 0;
        this.isWhite = notation === piece.notation.toUpperCase();
        this.name = piece.name;
        this.movement = piece.movement;
        this.canQueen = piece.canQueen;
        this.canSpawn = piece.canSpawn;
        this.value = piece.value;
        this.notation = notation;
        this.moveHistory = [];
        this.postMoveFunctions = piece.postMoveFunctions || [];
        // Optimisation: Caching evaluated MovePatterns
        var cachedPaths = [];
    }
    BasePiece.prototype.getRelativeDestination = function (transform) {
        var destination = applyTransform(transform, this.location, this.isWhite);
        return destination;
    };
    BasePiece.prototype.getAbsoluteDestination = function (transform) {
        var destination = applyTransform(transform, this.location, true);
        return destination;
    };
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