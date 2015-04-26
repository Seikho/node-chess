var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Direction = require("../../direction");
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
            notation: "q",
            moveHistory: []
        };
        _super.call(this, piece);
    }
    return QueenFactory;
})(BaseFactory);
var diag = helper.createMove([{ direction: Direction.Diagonal, count: 0 }], true, false, true);
var lat = helper.createMove([{ direction: Direction.Lateral, count: 0 }], true, false, true);
module.exports = QueenFactory;
//# sourceMappingURL=queen.js.map