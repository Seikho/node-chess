var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Chess = require("../types");
var helper = require("./helper");
var KingFactory = (function (_super) {
    __extends(KingFactory, _super);
    function KingFactory() {
        var piece = {
            name: "King",
            movement: [diag, lat],
            canQueen: false,
            canSpawn: false,
            value: 10,
        };
        _super.call(this, piece, "K");
    }
    return KingFactory;
})(Chess.PieceFactory);
var d = Chess.Direction;
var diag = helper.createMove([{ direction: 9 /* Diagonal */, count: 1 }], true, false, true);
var lat = helper.createMove([{ direction: 6 /* Lateral */, count: 1 }], true, false, true);
module.exports = KingFactory;
//# sourceMappingURL=king.js.map