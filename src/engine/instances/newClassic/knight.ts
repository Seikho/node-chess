import Chess = require("node-chess");
export = knight;

var upLeft = makeMove(-1, 2);
var upRight = makeMove(1, 2);

var downLeft = makeMove(-1, -2);
var downRight = makeMove(1, -2);

var leftUp = makeMove(-2, 1);
var leftDown = makeMove(-2, -1);

var rightUp = makeMove(2, 1);
var rightDown = makeMove(2, -1);

function makeMove(file: number, rank: number): Chess.MoveDefinition {
	return {
		canCapture: true,
		canMove: true,
		transforms: { file, rank }
	}
}

var knight: Chess.NewPiece = {
	name: "Knight",
	movement: [upLeft, upRight, downLeft, downRight, leftUp, leftDown, rightUp, rightDown],
	canQueen: false,
	canSpawn: true,
	value: 3,
	notation: "n"
}