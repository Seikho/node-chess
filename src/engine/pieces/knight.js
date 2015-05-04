var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Direction = require("../../direction");
var helper = require("./helper");
var BasePiece = require("../basePiece");
var KnightPiece = (function (_super) {
    __extends(KnightPiece, _super);
    function KnightPiece() {
        _super.apply(this, arguments);
        this.name = "Knight";
        this.movement = [horzThenVert, vertThenHorz];
        this.canQueen = false;
        this.canSpawn = true;
        this.value = 3;
        this.notation = "p";
    }
    return KnightPiece;
})(BasePiece);
var horzThenVert = helper.createMove([{ direction: Direction.Horizontal, count: 2 }, { direction: Direction.Vertical, count: 1 }], true, true, true);
var vertThenHorz = helper.createMove([{ direction: Direction.Vertical, count: 2 }, { direction: Direction.Horizontal, count: 1 }], true, true, true);
module.exports = KnightPiece;
//# sourceMappingURL=knight.js.map