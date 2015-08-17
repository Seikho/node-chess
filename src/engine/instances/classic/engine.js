var Engine = require("../../engine");
var pieces = require("./pieces/pieces");
var rules = require("./rules");
function classEngine() {
    var board = new Engine();
    Object.keys(pieces)
        .forEach(function (p) { return board.pieces.push(pieces[p]); });
    board.positionParser();
    board.postMoveFunctions = [
        rules.postMove,
    ];
    return board;
}
module.exports = classEngine;
//# sourceMappingURL=engine.js.map