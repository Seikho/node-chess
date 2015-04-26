var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Direction = require("../../direction");
var helper = require("./helper");
var BaseFactory = require("../baseFactory");
var KingFactory = (function (_super) {
    __extends(KingFactory, _super);
    function KingFactory() {
        var piece = {
            name: "King",
            movement: [diag, lat],
            canQueen: false,
            canSpawn: false,
            value: 10,
            notation: "k"
        };
        _super.call(this, piece);
    }
    return KingFactory;
})(BaseFactory);
var diag = helper.createMove([{ direction: Direction.Diagonal, count: 1 }], true, false, true);
var lat = helper.createMove([{ direction: Direction.Lateral, count: 1 }], true, false, true);
module.exports = KingFactory;
//# sourceMappingURL=king.js.map