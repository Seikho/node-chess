var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Direction = require("../../direction");
var BasePiece = require("../basePiece");
var RookPiece = (function (_super) {
    __extends(RookPiece, _super);
    function RookPiece() {
        _super.apply(this, arguments);
        this.name = "Rook";
        this.movement = [lat];
        this.canQueen = false;
        this.canSpawn = true;
        this.value = 5;
        this.notation = "r";
    }
    return RookPiece;
})(BasePiece);
RookPiece.prototype.notation = "r";
var lat = {
    moves: [{ direction: Direction.Lateral, count: 0 }],
    canJump: false,
    canCapture: true,
    canMove: true
};
module.exports = RookPiece;
//# sourceMappingURL=rook.js.map