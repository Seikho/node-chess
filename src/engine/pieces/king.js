var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Direction = require("../../direction");
var helper = require("./helper");
var BasePiece = require("../basePiece");
var KingPiece = (function (_super) {
    __extends(KingPiece, _super);
    function KingPiece() {
        _super.apply(this, arguments);
        this.name = "King";
        this.movement = [diag, lat];
        this.canQueen = false;
        this.canSpawn = false;
        this.value = 10;
        this.notation = "k";
    }
    return KingPiece;
})(BasePiece);
KingPiece.prototype.notation = "k";
var diag = helper.createMove([{ direction: Direction.Diagonal, count: 1 }], true, false, true);
var lat = helper.createMove([{ direction: Direction.Lateral, count: 1 }], true, false, true);
module.exports = KingPiece;
//# sourceMappingURL=king.js.map