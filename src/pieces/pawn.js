/// <reference path="../typings/internal.d.ts" />
var Chess = require("../types");
/**
 * Pawn piece registration
 */
var PawnFactory = {
    create: function (isWhite) {
        return {
            name: "Pawn",
            movement: [moveForward, moveCapture],
            canQueen: true,
            canSpawn: false,
            value: 1,
            isWhite: !!isWhite
        };
    },
    notation: "p"
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
module.exports = PawnFactory;
//# sourceMappingURL=pawn.js.map