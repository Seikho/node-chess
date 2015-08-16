var enums = require("../../enums");
var Direction = enums.Direction;
var firstMoveCondition = function (piece, boardState, board) {
    var history = boardState.moveHistory.filter(function (m) { return m.piece.id === piece.id; });
    return (history.length === 0);
};
var canLeftEnpassant = function (piece, boardState, board) {
    return hasEnpassantTag(Direction.UpLeft, piece, boardState, board);
};
var canRightEnpassant = function (piece, boardState, board) {
    return hasEnpassantTag(Direction.UpRight, piece, boardState, board);
};
var enpassantPostMove = {
    action: function (piece, boardState, board) {
        var pieceCurrentSquare = board.getSquare(piece.location, boardState);
        var coordBelow = piece.getRelativeDestinations(Direction.Down, 1)[0];
        var squareBelow = board.getSquare(coordBelow, boardState);
        boardState.capturedPieces.push(squareBelow.piece);
        squareBelow.piece = null;
        pieceCurrentSquare.tags["enpassant"] = undefined;
    }
};
var allowEnpassantCapture = {
    action: function (piece, boardState, board) {
        // Find the middle square between the originating and desination squares for tagging
        var coordinateToTag = piece.getRelativeDestinations(Direction.Down, 1)[0];
        var squareToTag = board.getSquare(coordinateToTag, boardState);
        squareToTag.tags["enpassant"] = piece.isWhite;
        boardState.postMoveFunctions.push({
            moveNumber: board.boardState.moveNumber + 1,
            action: function (piece, board) {
            }
        });
        //TODO: Add PostMoveFunction to board to remove the tag after the next move.
    }
};
var firstMovePattern = {
    moves: [{ direction: Direction.Up, count: 2 }],
    canJump: false,
    canCapture: false,
    canMove: true,
    useDefaultConditions: true,
    conditions: [firstMoveCondition],
    postMoveActions: [allowEnpassantCapture]
};
var leftEnpassant = {
    moves: [{ direction: Direction.UpLeft, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false,
    useDefaultConditions: false,
    conditions: [canLeftEnpassant],
    postMoveActions: [enpassantPostMove]
};
var rightEnpassant = {
    moves: [{ direction: Direction.UpRight, count: 1 }],
    canJump: false,
    canCapture: true,
    canMove: false,
    useDefaultConditions: false,
    conditions: [canRightEnpassant],
    postMoveActions: [enpassantPostMove]
};
function hasEnpassantTag(direction, piece, boardState, board) {
    var coordinate = piece.getRelativeDestinations(direction, 1);
    var square = board.getSquare(coordinate[0], boardState);
    if (square === null)
        return false;
    if (square.tags === null)
        return false;
    // If the square has an 'enpassant' tag of the opposite color (!thisPiece.isWhite), we can capture.
    var result = square.tags["enpassant"] === !piece.isWhite;
    return result;
}
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
    id: 0,
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