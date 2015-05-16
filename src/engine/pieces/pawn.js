var firstMovePattern = {
    moves: [{ direction: 0 /* Up */, count: 2 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var leftEnpassant = {
    moves: [{ direction: 10 /* UpLeft */, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false
};
var rightEnpassant = {
    moves: [{ direction: 11 /* UpRight */, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false
};
var firstMove = {
    action: function (piece) {
        if (piece.moveHistory.length === 0)
            return firstMovePattern;
        return null;
    }
};
function hasEnpassantTag(direction, piece, board) {
    var coordinate = piece.getRelativeDestinations(direction, 1);
    var square = board.getSquare(coordinate[0]);
    // If the square has an 'enpassant' tag of the opposite color (!thisPiece.isWhite), we can capture.
    return square.tags.some(function (tag) { return tag.enpassant === !piece.isWhite; });
}
var enpassantCapture = {
    action: function (piece, board) {
        var captures = [];
        if (hasEnpassantTag(10 /* UpLeft */, piece, board))
            captures.push(leftEnpassant);
        if (hasEnpassantTag(11 /* UpRight */, piece, board))
            captures.push(rightEnpassant);
        return captures.length === 0 ? null : captures;
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
        squareToTag.tags.push({ enpassant: piece.isWhite });
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
    conditionalMoves: [firstMove, enpassantCapture],
    notation: "p",
    postMoveFunctions: [allowEnpassantCapture]
};
module.exports = pawn;
//# sourceMappingURL=pawn.js.map