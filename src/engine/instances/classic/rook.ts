import {
	MoveDefinition,
	Piece
} from '../../../types';

var up = makeMove(0, 1);
var down = makeMove(0, -1);
var left = makeMove(-1, 0);
var right = makeMove(1, 0);

function makeMove(file: number, rank: number): MoveDefinition {
	return {
		canCapture: true,
		canMove: true,
		incrementer: { file, rank }
	}
}

var rook: Piece = {
	notation: "r",
	name: "Rook",
	movement: [up, down, left, right],
	canQueen: false,
	canSpawn: false,
	value: 5
}

export { rook as default }