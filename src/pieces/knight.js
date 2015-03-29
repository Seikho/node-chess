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
        var pawn = {
            name: "Knight",
            movement: [upLeft, upRight, downLeft, downRight, leftUp, leftDown, rightUp, rightDown],
            canQueen: true,
            canSpawn: false,
            value: 1,
        };
        _super.call(this, pawn, "n");
    }
    return KnightFactory;
})(Chess.PieceFactory);
var d = Chess.Direction;
var upLeft = helper.createMove([{ direction: 0 /* Up */, count: 2 }, { direction: 2 /* Left */, count: 1 }], true, true, true);
var upRight = helper.createMove([{ direction: 0 /* Up */, count: 2 }, { direction: 3 /* Right */, count: 1 }], true, true, true);
var downLeft = helper.createMove([{ direction: 1 /* Down */, count: 2 }, { direction: 2 /* Left */, count: 1 }], true, true, true);
var downRight = helper.createMove([{ direction: 1 /* Down */, count: 2 }, { direction: 3 /* Right */, count: 1 }], true, true, true);
var leftUp = helper.createMove([{ direction: 2 /* Left */, count: 2 }, { direction: 0 /* Up */, count: 1 }], true, true, true);
var leftDown = helper.createMove([{ direction: 2 /* Left */, count: 2 }, { direction: 1 /* Down */, count: 1 }], true, true, true);
var rightUp = helper.createMove([{ direction: 3 /* Right */, count: 2 }, { direction: 0 /* Up */, count: 1 }], true, true, true);
var rightDown = helper.createMove([{ direction: 3 /* Right */, count: 2 }, { direction: 1 /* Down */, count: 1 }], true, true, true);
module.exports = KnightFactory;
//# sourceMappingURL=knight.js.map