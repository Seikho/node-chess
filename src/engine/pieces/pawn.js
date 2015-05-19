var firstMoveCondition = function (piece) {
    return (piece.moveHistory.length === 0);
};
var canLeftEnpassant = function (piece, board) {
    return hasEnpassantTag(10 /* UpLeft */, piece, board);
};
var canRightEnpassant = function (piece, board) {
    return hasEnpassantTag(11 /* UpRight */, piece, board);
};
var firstMovePattern = {
    moves: [{ direction: 0 /* Up */, count: 2 }],
    canJump: false,
    canCapture: false,
    canMove: true,
    useDefaultConditions: true,
    conditions: [firstMoveCondition],
    postMoveActions: [allowEnpassantCapture]
};
var leftEnpassant = {
    moves: [{ direction: 10 /* UpLeft */, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false,
    useDefaultConditions: false,
    conditions: [canLeftEnpassant],
    postMoveActions: []
};
var rightEnpassant = {
    moves: [{ direction: 11 /* UpRight */, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false,
    useDefaultConditions: false,
    conditions: [canRightEnpassant],
    postMoveActions: []
};
function hasEnpassantTag(direction, piece, board) {
    var coordinate = piece.getRelativeDestinations(direction, 1);
    var square = board.getSquare(coordinate[0]);
    if (square === null)
        return false;
    if (square.tags === null)
        return false;
    // If the square has an 'enpassant' tag of the opposite color (!thisPiece.isWhite), we can capture.
    var result = square.tags.some(function (tag) { return tag.enpassant === !piece.isWhite; });
    return result;
}
var allowEnpassantCapture = {
    action: function (piece, board) {
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
    movement: [moveForward, moveCapture, firstMovePattern, leftEnpassant, rightEnpassant],
    canQueen: true,
    canSpawn: false,
    value: 1,
    notation: "p"
};
module.exports = pawn;
//# sourceMappingURL=pawn.js.map