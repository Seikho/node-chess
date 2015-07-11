var firstMoveCondition = function (piece) {
    return (piece.moveHistory.length === 0);
};
var canLeftEnpassant = function (piece, board) {
    return hasEnpassantTag(Chess.Direction.UpLeft, piece, board);
};
var canRightEnpassant = function (piece, board) {
    return hasEnpassantTag(Chess.Direction.UpRight, piece, board);
};
var enpassantPostMove = {
    action: function (piece, board) {
        var pieceCurrentSquare = board.getSquare(piece.location);
        var coordBelow = piece.getRelativeDestinations(Chess.Direction.Down, 1)[0];
        var squareBelow = board.getSquare(coordBelow);
        board.capturedPieces.push(squareBelow.piece);
        squareBelow.piece = null;
        pieceCurrentSquare.tags["enpassant"] = undefined;
    }
};
var allowEnpassantCapture = {
    action: function (piece, board) {
        // Find the middle square between the originating and desination squares for tagging
        var coordinateToTag = piece.getRelativeDestinations(Chess.Direction.Down, 1)[0];
        var squareToTag = board.getSquare(coordinateToTag);
        squareToTag.tags["enpassant"] = piece.isWhite;
        board.postMoveActions.push({
            moveNumber: board.moveNumber + 1,
            action: function (piece, board) {
            }
        });
        //TODO: Add PostMoveFunction to board to remove the tag after the next move.
    }
};
var firstMovePattern = {
    moves: [{ direction: Chess.Direction.Up, count: 2 }],
    canJump: false,
    canCapture: false,
    canMove: true,
    useDefaultConditions: true,
    conditions: [firstMoveCondition],
    postMoveActions: [allowEnpassantCapture]
};
var leftEnpassant = {
    moves: [{ direction: Chess.Direction.UpLeft, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false,
    useDefaultConditions: false,
    conditions: [canLeftEnpassant],
    postMoveActions: [enpassantPostMove]
};
var rightEnpassant = {
    moves: [{ direction: Chess.Direction.UpRight, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false,
    useDefaultConditions: false,
    conditions: [canRightEnpassant],
    postMoveActions: [enpassantPostMove]
};
function hasEnpassantTag(direction, piece, board) {
    var coordinate = piece.getRelativeDestinations(direction, 1);
    var square = board.getSquare(coordinate[0]);
    if (square === null)
        return false;
    if (square.tags === null)
        return false;
    // If the square has an 'enpassant' tag of the opposite color (!thisPiece.isWhite), we can capture.
    var result = square.tags["enpassant"] === !piece.isWhite;
    return result;
}
var moveForward = {
    moves: [{ direction: Chess.Direction.Up, count: 1 }],
    canJump: false,
    canCapture: false,
    canMove: true
};
var moveCapture = {
    moves: [{ direction: Chess.Direction.DiagonalUp, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false
};
var forward = {
    direction: Chess.Direction.Up,
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