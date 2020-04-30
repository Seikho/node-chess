import {
	MoveDefinition,
	IPiece
} from '../../../types';

/**
 * Knight
 */

const upLeft = makeMove(-1, 2);
const upRight = makeMove(1, 2);

const downLeft = makeMove(-1, -2);
const downRight = makeMove(1, -2);

const leftUp = makeMove(-2, 1);
const leftDown = makeMove(-2, -1);

const rightUp = makeMove(2, 1);
const rightDown = makeMove(2, -1);

function makeMove(file: number, rank: number): MoveDefinition {
	return {
		canCapture: true,
		canMove: true,
		transforms: { file, rank, canJump: true },
	}
}

const knight: IPiece = {
	name: "Knight",
	movement: [upLeft, upRight, downLeft, downRight, leftUp, leftDown, rightUp, rightDown],
	canQueen: false,
	canSpawn: true,
	value: 3,
	notation: "n",
	postMoveFunctions: []
}

export { knight as default }
