var Board = require("./board");
var Pawn = require("./pieces/pawn");
var boards = {
    classicBoard: new Board()
};
boards.classicBoard.pieces.push(Pawn);
module.exports = boards;
//# sourceMappingURL=index.js.map