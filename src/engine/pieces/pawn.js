var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Direction = require("../../direction");
var BasePiece = require("../basePiece");
/**
 * Pawn piece registration
 */
var PawnPiece = (function (_super) {
    __extends(PawnPiece, _super);
    function PawnPiece() {
        _super.apply(this, arguments);
        this.name = "Pawn";
        this.movement = [moveForward, moveCapture];
        this.canQueen = true;
        this.canSpawn = false;
        this.value = 1;
        this.notation = "p";
        this.conditionalMoves = [firstMoveConditional];
    }
    return PawnPiece;
})(BasePiece);
function firstMoveConditional() {
    if (this.moveHistory.length === 0)
        return firstMovePattern;
    else
        null;
}
var firstMovePattern = {
    moves: [{ direction: Direction.Up, count: 2 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var moveForward = {
    moves: [{ direction: Direction.Up, count: 1 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var moveCapture = {
    moves: [{ direction: Direction.DiagonalUp, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false
};
var forward = {
    direction: Direction.Up,
    count: 1
};
module.exports = PawnPiece;
//# sourceMappingURL=pawn.js.map