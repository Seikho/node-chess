var Board = require("./board");
var Pawn = require("./pieces/pawn");
var boards = {};
var classicBoard = new Board();
classicBoard.pieces.push(new Pawn());
boards.classic = classicBoard;
module.exports = boards;
//# sourceMappingURL=index.js.map