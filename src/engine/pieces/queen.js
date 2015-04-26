var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var types = require("../../types");
var helper = require("./helper");
var BaseFactory = require("../baseFactory");
var QueenFactory = (function (_super) {
    __extends(QueenFactory, _super);
    function QueenFactory() {
        var piece = {
            name: "Queen",
            movement: [diag, lat],
            canQueen: false,
            canSpawn: true,
            value: 9,
            notation: "q"
        };
        _super.call(this, piece);
    }
    return QueenFactory;
})(BaseFactory);
var d = types.Direction;
var diag = helper.createMove([{ direction: d.Diagonal, count: 0 }], true, false, true);
var lat = helper.createMove([{ direction: d.Lateral, count: 0 }], true, false, true);
module.exports = QueenFactory;
//# sourceMappingURL=queen.js.map