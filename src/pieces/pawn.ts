/// <reference path="../typings/internal.d.ts" />
import Chess = require("../types");
export = pawn;
/**
 * Pawn piece registration
 */
var pawn: Chess.Piece = {
	name: "Pawn",
	notation: "p",
	value: 1,
	movement: []
}

var moveForward = {
	moves: [{ direction: Chess.Direction.Up, count: 1 }],
	canJump: false,
	canCapture: false,
	canMove: true
}

var moveCapture = {
	moves: [{ direction: Chess.Direction.DiagonalUp, count: 1 }],
	canJump: false,
	canCapture: true,
	canMove: false
}

var forward: Chess.SingleMove = {
	direction: Chess.Direction.Up,
	count: 1
}

pawn.movement.push(moveCapture);
pawn.movement.push(moveForward);
