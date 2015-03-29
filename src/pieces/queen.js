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
            movement: [upLeft, upRight],
            canQueen: false,
            canSpawn: true,
            value: 9,
        };
        _super.call(this, pawn, "q");
    }
    return QueenFactory;
})(Chess.PieceFactory);
var d = Chess.Direction;
var upLeft = helper.createMove([{ direction: 4 /* DiagonalUp */, count: 0 }], true, false, true);
var upRight = helper.createMove([{ direction: 5 /* DiagonalDown */, count: 0 }], true, false, true);
var up = helper.createMove([{ direction: 0 /* Up */, count: 0 }], true, false, true);
var down = helper.createMove([{ direction: 1 /* Down */, count: 0 }], true, false, true);
var left = helper.createMove([{ direction: 2 /* Left */, count: 0 }], true, false, true);
var right = helper.createMove([{ direction: 3 /* Right */, count: 0 }], true, false, true);
module.exports = QueenFactory;
//# sourceMappingURL=queen.js.map