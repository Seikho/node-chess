var getTransforms = require("./helpers/getTransforms");
var applyTransform = require("./helpers/applyTransform");
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