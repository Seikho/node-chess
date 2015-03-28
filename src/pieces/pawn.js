var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../typings/internal.d.ts" />
var Chess = require("../types");
/**
 * Pawn piece registration
 */
var PawnFactory = (function (_super) {
    __extends(PawnFactory, _super);
    function PawnFactory() {
        var pawn = {
            name: "Pawn",
            movement: [moveForward, moveCapture],
            canQueen: true,
            canSpawn: false,
            value: 1,
        };
        _super.call(this, pawn, "p");
    }
    return PawnFactory;
})(Chess.PieceFactory);
var moveForward = {
    moves: [{ direction: 0 /* Up */, count: 1 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var moveCapture = {
    moves: [{ direction: 4 /* DiagonalUp */, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false
};
var forward = {
    direction: 0 /* Up */,
    count: 1
};
module.exports = PawnFactory;
//# sourceMappingURL=pawn.js.map