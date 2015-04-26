var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var types = require("../../types");
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
var d = types.Direction;
var diag = helper.createMove([{ direction: d.Diagonal, count: 1 }], true, false, true);
var lat = helper.createMove([{ direction: d.Lateral, count: 1 }], true, false, true);
module.exports = KingFactory;
//# sourceMappingURL=king.js.map