var Engine = require("../../engine");
var pawn = require("./pawn");
var knight = require("./knight");
var bishop = require("./bishop");
var rook = require("./rook");
var queen = require("./queen");
var king = require("./king");
var mates = require("./rules");
function classEngine() {
    var board = new Engine();
    board.pieces = [
        pawn, knight, bishop, rook, queen, king
    ];
    board.positionParser();
    board.postMoveFunctions = [mates.postMove];
    return board;
}
module.exports = classEngine;
//# sourceMappingURL=engine.js.map