var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Chess = require("../types");
var helper = require("./helper");
var QueenFactory = (function (_super) {
    __extends(QueenFactory, _super);
    function QueenFactory() {
        var pawn = {
            name: "Queen",
            movement: [diag, lat],
            canQueen: false,
            canSpawn: true,
            value: 9,
        };
        _super.call(this, pawn, "q");
    }
    return QueenFactory;
})(Chess.PieceFactory);
var d = Chess.Direction;
var diag = helper.createMove([{ direction: 9 /* Diagonal */, count: 0 }], true, false, true);
var lat = helper.createMove([{ direction: 6 /* Lateral */, count: 0 }], true, false, true);
module.exports = QueenFactory;
//# sourceMappingURL=queen.js.map