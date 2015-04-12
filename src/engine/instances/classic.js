var Engine = require("../engine");
var Fen = require("../parsers/fen");
var pieces = require("../pieces/pieces");
function newClassicEngine() {
    var board = new Engine();
    for (var p in pieces)
        board.pieces.push(new pieces[p]());
    var start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    board.positionParser = new Fen(board);
    board.positionParser.parse(start);
    return board;
}
module.exports = newClassicEngine;
//# sourceMappingURL=classic.js.map