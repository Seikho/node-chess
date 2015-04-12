import classicEngine = require("./engine/instances/classic");
setTimeout(createEngine, 20000);

function createEngine() {
	var board = classicEngine();
	var moves = console.log(board.availableMoves({file: 2, rank: 1}));
}
