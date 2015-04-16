var Engine = require("../engine");
var pieces = require("../pieces/pieces");
function classEngine() {
    var board = new Engine();
    for (var p in pieces)
        board.pieces.push(new pieces[p]());
    board.positionParser();
    return board;
}
module.exports = classEngine;
//# sourceMappingURL=classic.js.map