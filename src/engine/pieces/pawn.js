var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Direction = require("../../direction");
var BaseFactory = require("../baseFactory");
/**
 * Pawn piece registration
 */
var PawnFactory = (function (_super) {
    __extends(PawnFactory, _super);
    function PawnFactory() {
        var piece = {
            name: "Pawn",
            movement: [moveForward, moveCapture],
            canQueen: true,
            canSpawn: false,
            value: 1,
            notation: "p"
        };
        _super.call(this, piece);
    }
    return PawnFactory;
})(BaseFactory);
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
module.exports = PawnFactory;
//# sourceMappingURL=pawn.js.map