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
    Direction[Direction["Diagonal"] = 9] = "Diagonal";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
var PieceFactory = (function () {
    function PieceFactory(piece) {
        this.piece = piece;
        this.notation = piece.notation;
    }
    PieceFactory.prototype.create = function (isWhite) {
        return {
            name: this.piece.name,
            movement: this.piece.movement,
            canQueen: this.piece.canQueen,
            canSpawn: this.piece.canSpawn,
            value: this.piece.value,
            isWhite: !!isWhite,
            notation: this.notation
        };
    };
    return PieceFactory;
})();
exports.PieceFactory = PieceFactory;
(function (Turn) {
    Turn[Turn["White"] = "w"] = "White";
    Turn[Turn["Black"] = "b"] = "Black";
})(exports.Turn || (exports.Turn = {}));
var Turn = exports.Turn;
(function (Castling) {
    Castling[Castling["WhiteKingSide"] = "K"] = "WhiteKingSide";
    Castling[Castling["WhiteQueenSide"] = "Q"] = "WhiteQueenSide";
    Castling[Castling["BlackKingSide"] = "k"] = "BlackKingSide";
    Castling[Castling["BlackQueenSide"] = "q"] = "BlackQueenSide";
})(exports.Castling || (exports.Castling = {}));
var Castling = exports.Castling;
