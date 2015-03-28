var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Chess = require("../types");
var RookFactory = (function (_super) {
    __extends(RookFactory, _super);
    function RookFactory() {
        var rook = {
            name: "Rook",
            movement: [moveUp, moveDown, moveLeft, moveRight],
            canQueen: true,
            canSpawn: false,
            value: 1,
        };
        _super.call(this, rook, "r");
    }
    return RookFactory;
})(Chess.PieceFactory);
var moveUp = {
    moves: [{ direction: 0 /* Up */, count: 0 }],
    canJump: false,
    canCapture: true,
    canMove: true
};
var moveDown = {
    moves: [{ direction: 1 /* Down */, count: 0 }],
    canJump: false,
    canCapture: true,
    canMove: true
};
var moveLeft = {
    moves: [{ direction: 2 /* Left */, count: 0 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var moveRight = {
    moves: [{ direction: 3 /* Right */, count: 0 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
module.exports = RookFactory;
//# sourceMappingURL=rook.js.map