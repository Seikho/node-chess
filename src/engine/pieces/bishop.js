var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BasePiece = require("../basePiece");
var helper = require("./helper");
var Direction = require("../../direction");
var BishopPiece = (function (_super) {
    __extends(BishopPiece, _super);
    function BishopPiece() {
        _super.apply(this, arguments);
        this.name = "Bishop";
        this.movement = [diag];
        this.canQueen = false;
        this.canSpawn = true;
        this.value = 3;
        this.notation = "b";
    }
    return BishopPiece;
})(BasePiece);
BishopPiece.prototype.notation = "b";
var diag = helper.createMove([{ direction: Direction.Diagonal, count: 0 }], true, false, true);
module.exports = BishopPiece;
//# sourceMappingURL=bishop.js.map