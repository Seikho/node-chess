/// <reference path="../typings/internal.d.ts" />
var Chess = require("../types");
/**
 * Pawn piece registration
 */
var pawn = {
    name: "Pawn",
    notation: "p",
    value: 1,
    movement: [],
    canQueen: true,
    canSpawn: false
};
var moveForward = {
    moves: [{ direction: 0 /* Up */, count: 1 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var moveCapture = {
    moves: [{ direction: 4 /* DiagonalUp */, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false
};
var forward = {
    direction: 0 /* Up */,
    count: 1
};
pawn.movement.push(moveCapture);
pawn.movement.push(moveForward);
module.exports = pawn;
