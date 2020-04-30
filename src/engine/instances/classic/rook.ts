import {
	IPiece,
	MoveDefinition
} from '../../../types';

const up = makeMove(0, 1);
const down = makeMove(0, -1);
const left = makeMove(-1, 0);
const right = makeMove(1, 0);

function makeMove(file: number, rank: number): MoveDefinition {
	return {
		canCapture: true,
		canMove: true,
		incrementer: { file, rank }
	}
}

const rook: IPiece = {
	notation: "r",
	name: "Rook",
	movement: [up, down, left, right],
	canQueen: false,
	canSpawn: false,
	value: 5,
	postMoveFunctions: []
}

export { rook as default }
