import {
	MoveDefinition,
	Piece
} from '../../../types';

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

var bishop: Piece = {
	notation: "b",
	name: "Bishop",
	movement: [upLeft, upRight, downLeft, downRight],
	canQueen: false,
	canSpawn: false,
	value: 3
}

export { bishop as default }