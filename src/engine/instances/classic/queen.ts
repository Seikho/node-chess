import {
	MoveDefinition,
	Piece
} from '../../../types';

var up = makeMove(0, 1);
var down = makeMove(0, -1);
var left = makeMove(-1, 0);
var right = makeMove(1, 0);
var upLeft = makeMove(-1, 1);
var upRight = makeMove(1, 1);
var downLeft = makeMove(-1, -1);
var downRight = makeMove(1, -1);

function makeMove(file: number, rank: number): MoveDefinition {
	return {
		canCapture: true,
		canMove: true,
		incrementer: { file, rank }
	}
}

var queen: Piece = {
	notation: "q",
	name: "Queen",
	movement: [upLeft, upRight, downLeft, downRight, up, down, left, right],
	canQueen: false,
	canSpawn: false,
	value: 9
}

export { queen as default }