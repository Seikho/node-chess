var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Direction = require("../../direction");
var helper = require("./helper");
var BasePiece = require("../basePiece");
var QueenPiece = (function (_super) {
    __extends(QueenPiece, _super);
    function QueenPiece() {
        _super.apply(this, arguments);
        this.name = "Queen";
        this.movement = [diag, lat];
        this.canQueen = false;
        this.canSpawn = true;
        this.value = 9;
        this.notation = "q";
    }
    return QueenPiece;
})(BasePiece);
QueenPiece.prototype.notation = "q";
var diag = helper.createMove([{ direction: Direction.Diagonal, count: 0 }], true, false, true);
var lat = helper.createMove([{ direction: Direction.Lateral, count: 0 }], true, false, true);
module.exports = QueenPiece;
//# sourceMappingURL=queen.js.map