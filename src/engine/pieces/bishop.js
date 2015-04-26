var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseFactory = require("../baseFactory");
var helper = require("./helper");
var Direction = require("../../direction");
var BishopFactory = (function (_super) {
    __extends(BishopFactory, _super);
    function BishopFactory() {
        var piece = {
            name: "Bishop",
            movement: [diag],
            canQueen: false,
            canSpawn: true,
            value: 3,
            notation: "b"
        };
        _super.call(this, piece);
    }
    return BishopFactory;
})(BaseFactory);
var diag = helper.createMove([{ direction: Direction.Diagonal, count: 0 }], true, false, true);
module.exports = BishopFactory;
//# sourceMappingURL=bishop.js.map