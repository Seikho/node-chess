import {
	MoveDefinition,
	IPiece
} from '../../../types';

const upLeft = makeMove(-1, 1);
const upRight = makeMove(1, 1);
const downLeft = makeMove(-1, -1);
const downRight = makeMove(1, -1);

function makeMove(file: number, rank: number): MoveDefinition {
	return {
		canCapture: true,
		canMove: true,
		incrementer: { file, rank }
	}
}

const bishop: IPiece = {
	notation: "b",
	name: "Bishop",
	movement: [upLeft, upRight, downLeft, downRight],
	canQueen: false,
	canSpawn: false,
	value: 3,
	postMoveFunctions: []
}

export { bishop as default }
