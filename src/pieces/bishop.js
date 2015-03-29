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
            movement: [upLeft, upRight],
            canQueen: true,
            canSpawn: false,
            value: 1,
        };
        _super.call(this, pawn, "b");
    }
    return BishopFactory;
})(Chess.PieceFactory);
var d = Chess.Direction;
var upLeft = helper.createMove([{ direction: 4 /* DiagonalUp */, count: 0 }], true, false, true);
var upRight = helper.createMove([{ direction: 5 /* DiagonalDown */, count: 0 }], true, false, true);
module.exports = BishopFactory;
//# sourceMappingURL=bishop.js.map