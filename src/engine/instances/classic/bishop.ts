import Chess = require("node-chess");
export = bishop;

var upLeft = makeMove(-1, 1);
var upRight = makeMove(1, 1);
var downLeft = makeMove(-1, -1);
var downRight = makeMove(1, -1);

function makeMove(file: number, rank: number): Chess.MoveDefinition {
	return {
		canCapture: true,
		canMove: true,
		incrementer: { file, rank }
	}
}

var bishop: Chess.Piece = {
	notation: "b",
	name: "Bishop",
	movement: [upLeft, upRight, downLeft, downRight],
	canQueen: false,
	canSpawn: false,
	value: 3
}