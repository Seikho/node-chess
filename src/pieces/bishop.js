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
        var pawn = {
            name: "Bishop",
            movement: [diagUp, diagDown],
            canQueen: false,
            canSpawn: true,
            value: 3,
        };
        _super.call(this, pawn, "b");
    }
    return BishopFactory;
})(Chess.PieceFactory);
var d = Chess.Direction;
var diagUp = helper.createMove([{ direction: 4 /* DiagonalUp */, count: 0 }], true, false, true);
var diagDown = helper.createMove([{ direction: 5 /* DiagonalDown */, count: 0 }], true, false, true);
module.exports = BishopFactory;
//# sourceMappingURL=bishop.js.map