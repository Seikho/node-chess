import Chess = require("../types");
export function createMove(moves: Chess.SingleMove[], canMove?: boolean, canJump?: boolean, canCapture?: boolean): Chess.MovePattern {
	return {
		moves: moves,
		canJump: !!canJump,
		canMove: !!canMove,
		canCapture: !!canCapture
	}
}