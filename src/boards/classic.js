var Board = require("../board");
var Fen = require("../parsers/fen");
var pieces = require("../pieces/pieces");
function newClassicBoard() {
    var board = new Board();
    for (var p in pieces)
        board.pieces.push(new pieces[p]());
    var start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    var fen = new Fen(board);
    fen.parse(start);
    return board;
}
module.exports = newClassicBoard;
//# sourceMappingURL=classic.js.map