import pieces = require("./engine/pieces/pieces");

console.log(pieces.pawn);
var p = new pieces.pawn();
console.log(new pieces.pawn());
console.log(p.getConditionalMoves());
//import classicEngine = require("./engine/instances/classic");
//
//function createEngine() {
//	var board = classicEngine();
//	console.log(board.toString());
//	var moves = console.log(board.availableMoves({file: 3, rank: 1}));
//	board.availableMoves({ rank: 1, file: 2 });
//}
//
//createEngine();
//
