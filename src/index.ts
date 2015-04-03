import classicBoard = require("./boards/classic");

var board = classicBoard();
var moves = board.availableMoves({file: 2, rank: 1});
