import classicEngine = require("./engine/instances/classic");

function createEngine() {
	var board = classicEngine();
	console.log(board.toString());
	var moves = console.log(board.availableMoves({file: 3, rank: 1}));
}

createEngine();
