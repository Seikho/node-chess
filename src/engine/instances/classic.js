var Engine = require("../engine");
var pieces = require("../pieces/pieces");
var rules = require("./rules");
function classEngine() {
    var board = new Engine();
    Object.keys(pieces)
        .forEach(function (p) { return board.pieces.push(pieces[p]); });
    board.positionParser();
    board.boardState.postMoveFunctions = [
        rules.allowedMoves.bind(board),
        rules.checkmatePostMove.bind(board),
        rules.stalematePostMove.bind(board)
    ];
    return board;
}
module.exports = classEngine;
//# sourceMappingURL=classic.js.map