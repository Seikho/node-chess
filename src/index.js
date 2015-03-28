var Board = require("./board");
var pawn = require("./pieces/pawn");
var boards = {};
var classicBoard = new Board();
classicBoard.pieces.push(pawn);
boards.classic = classicBoard;
module.exports = boards;
//# sourceMappingURL=index.js.map