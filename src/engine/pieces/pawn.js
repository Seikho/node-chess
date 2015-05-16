var firstMovePattern = {
    moves: [{ direction: 0 /* Up */, count: 2 }],
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
        var leftSquare = piece.getRelativeDestinations(10 /* DiagonalUpLeft */, 1)[0];
        var rightSquare = piece.getRelativeDestinations(11 /* DiagonalUpRight */, 1)[0];
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
        var coordinateToTag = piece.getRelativeDestinations(1 /* Down */, 1)[0];
        var squareToTag = board.getSquare(coordinateToTag);
        squareToTag.tags.push({ enPassant: piece.isWhite });
        //TODO: Add PostMoveFunction to board to remove the tag after the next move.
    }
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