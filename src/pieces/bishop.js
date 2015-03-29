var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Chess = require("../types");
var helper = require("./helper");
var BishopFactory = (function (_super) {
    __extends(BishopFactory, _super);
    function BishopFactory() {
        var piece = {
            name: "Bishop",
            movement: [diag],
            canQueen: false,
            canSpawn: true,
            value: 3,
        };
        _super.call(this, piece, "b");
    }
    return BishopFactory;
})(Chess.PieceFactory);
var d = Chess.Direction;
var diag = helper.createMove([{ direction: 9 /* Diagonal */, count: 0 }], true, false, true);
module.exports = BishopFactory;
//# sourceMappingURL=bishop.js.map