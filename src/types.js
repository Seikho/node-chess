/// <reference path="typings/internal.d.ts" />
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
    Direction[Direction["DiagonalUp"] = 4] = "DiagonalUp";
    Direction[Direction["DiagonalDown"] = 5] = "DiagonalDown";
    Direction[Direction["Lateral"] = 6] = "Lateral";
    Direction[Direction["Horizontal"] = 7] = "Horizontal";
    Direction[Direction["Vertical"] = 8] = "Vertical";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
var PieceFactory = (function () {
    function PieceFactory(piece, notation) {
        this.piece = piece;
        this.notation = notation.slice(0, 1).toLowerCase();
    }
    PieceFactory.prototype.create = function (isWhite) {
        return {
            name: this.piece.name,
            movement: this.piece.movement,
            canQueen: this.piece.canQueen,
            canSpawn: this.piece.canSpawn,
            value: this.piece.value,
            isWhite: !!isWhite
        };
    };
    return PieceFactory;
})();
exports.PieceFactory = PieceFactory;
//# sourceMappingURL=types.js.map