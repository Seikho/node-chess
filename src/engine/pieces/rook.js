var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Direction = require("../../direction");
var BaseFactory = require("../baseFactory");
var RookFactory = (function (_super) {
    __extends(RookFactory, _super);
    function RookFactory() {
        var piece = {
            name: "Rook",
            movement: [lat],
            canQueen: false,
            canSpawn: true,
            value: 5,
            notation: "r",
            moveHistory: []
        };
        _super.call(this, piece);
    }
    return RookFactory;
})(BaseFactory);
var lat = {
    moves: [{ direction: Direction.Lateral, count: 0 }],
    canJump: false,
    canCapture: true,
    canMove: true
};
module.exports = RookFactory;
//# sourceMappingURL=rook.js.map