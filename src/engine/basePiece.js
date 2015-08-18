var getTransforms = require("./helpers/getTransforms");
var applyTransform = require("./helpers/applyTransform");
var BasePiece = (function () {
    function BasePiece(piece, notation) {
        var _this = this;
        this.id = 0;
        this.transformCache = [];
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
        piece.movement.forEach(function (move) {
            var pattern = {
                canJump: move.canJump,
                canMove: move.canMove,
                canCapture: move.canCapture,
                moves: null
            };
            move.moves.forEach(function (m) {
                var moves = getTransforms(m, _this.isWhite);
                _this.transformCache.push({ moves: moves, pattern: pattern });
            });
        });
    }
    BasePiece.prototype.getRelativeDestinations = function (direction, count) {
        var _this = this;
        var transforms = getTransforms({ direction: direction, count: 0 }, this.isWhite);
        var appliedTransforms = transforms.map(function (t) { return modifyTransform(t, count); });
        var destinations = appliedTransforms.map(function (transform) { return applyTransform(_this.location, transform); });
        return destinations;
    };
    return BasePiece;
})();
function modifyTransform(transform, count) {
    return {
        file: transform.file * count,
        rank: transform.rank * count
    };
}
module.exports = BasePiece;
//# sourceMappingURL=basePiece.js.map