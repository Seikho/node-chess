var Board = require("./board");
var pieces = require("./pieces/pieces");
var Fen = require("./parsers/fen");
var boards = {
    classicBoard: new Board()
};
for (var p in pieces)
    boards.classicBoard.pieces.push(new pieces[p]());
var start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var fen = new Fen(boards.classicBoard);
fen.parse(start);
console.log(fen.board.toString());
module.exports = boards;
//# sourceMappingURL=index.js.map