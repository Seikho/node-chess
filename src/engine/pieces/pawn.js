var Direction = require("../../direction");
var firstMovePattern = {
    moves: [{ direction: Direction.Up, count: 2 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var firstMove = {
    action: function (piece) {
        if (piece.moveHistory.length === 0)
            return firstMovePattern;
        return null;
    }
};
var enpassantCapture = {
    action: function (piece, board) {
        return null;
    }
};
var allowEnpassantCapture = {
    action: function (piece, board) {
        // Only apply the 'EnPassant' tag if this is the first move and we moved 2 squares
        if (piece.moveHistory.length !== 1)
            return null;
        var move = piece.moveHistory[0];
        var squaresMoved = Math.abs(move.from.rank - move.to.rank);
        if (squaresMoved !== 2)
            return null;
        // Find the middle square between the originating and desination squares for tagging
        var isWhite = move.from.rank < move.to.rank;
        var middleSquare = move.from.rank + (isWhite ? 1 : -1);
        var squareToTag = { file: move.from.file, rank: middleSquare };
        board.getSquare(squareToTag).tags.push({ enPassant: isWhite });
    }
};
var moveForward = {
    moves: [{ direction: Direction.Up, count: 1 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var moveCapture = {
    moves: [{ direction: Direction.DiagonalUp, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false
};
var forward = {
    direction: Direction.Up,
    count: 1
};
var pawn = {
    location: null,
    name: "Pawn",
    movement: [moveForward, moveCapture],
    canQueen: true,
    canSpawn: false,
    value: 1,
    conditionalMoves: [firstMove],
    notation: "p",
    postMoveFunctions: [allowEnpassantCapture]
};
module.exports = pawn;
//# sourceMappingURL=pawn.js.map