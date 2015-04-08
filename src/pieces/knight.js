var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Chess = require("../types");
var helper = require("./helper");
var KnightFactory = (function (_super) {
    __extends(KnightFactory, _super);
    function KnightFactory() {
        var piece = {
            name: "Knight",
            movement: [horzThenVert, vertThenHorz],
            canQueen: false,
            canSpawn: true,
            value: 3,
            notation: "n"
        };
        _super.call(this, piece);
    }
    return KnightFactory;
})(Chess.PieceFactory);
var d = Chess.Direction;
var horzThenVert = helper.createMove([{ direction: d.Horizontal, count: 2 }, { direction: d.Vertical, count: 1 }], true, true, true);
var vertThenHorz = helper.createMove([{ direction: d.Vertical, count: 2 }, { direction: d.Horizontal, count: 1 }], true, true, true);
module.exports = KnightFactory;
//# sourceMappingURL=knight.js.map