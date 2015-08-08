var Engine = require("../engine");
var pieces = require("../pieces/pieces");
function classEngine() {
    var board = new Engine();
    Object.keys(pieces)
        .forEach(function (p) { return board.pieces.push(pieces[p]); });
    board.positionParser();
    board.ranks.length;
    return board;
}
module.exports = classEngine;
//# sourceMappingURL=classic.js.map