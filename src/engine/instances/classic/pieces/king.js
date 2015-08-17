var enums = require("../../../../enums");
var Direction = enums.Direction;
var queenSideCastleCondition = function (piece, boardState, board) {
    var history = getHistory(piece, boardState, board);
    if (history.length > 0)
        return false;
    var f = function (num) { return getSquare(piece, board, boardState, Direction.QueenSide, num); };
    var queenSquare = f(1);
    var bishopSquare = f(2);
    var knightSquare = f(3);
    var rookSquare = f(4);
    var squaresAreVacant = !queenSquare.piece
        && !bishopSquare.piece
        && !knightSquare.piece
        && !!rookSquare.piece;
    if (!squaresAreVacant)
        return false;
    var rookHistory = getHistory(rookSquare.piece, boardState, board);
    var rookHasMoved = rookHistory.length > 0;
    return !rookHasMoved;
};
var kingSideCastleCondition = function (piece, boardState, board) {
    var history = getHistory(piece, boardState, board);
    if (history.length > 0)
        return false;
    var f = function (num) { return getSquare(piece, board, boardState, Direction.KingSide, num); };
    var bishopSquare = f(1);
    var knightSquare = f(2);
    var rookSquare = f(3);
    var squaresAreVacant = !bishopSquare.piece
        && !knightSquare.piece
        && !!rookSquare.piece;
    if (!squaresAreVacant)
        return false;
    var rookHistory = getHistory(rookSquare.piece, boardState, board);
    var rookHasMoved = rookHistory.length > 0;
    return !rookHasMoved;
};
var postQueenSideCastle = {
    action: function (piece, boardState, board) {
        var rookSquare = getSquare(piece, board, boardState, Direction.QueenSide, 2);
        var nextSquare = getSquare(piece, board, boardState, Direction.KingSide, 1);
        nextSquare.piece = rookSquare.piece;
        rookSquare.piece = null;
    }
};
var postKingSideCastle = {
    action: function (piece, boardState, board) {
        var rookSquare = getSquare(piece, board, boardState, Direction.KingSide, 1);
        var nextSquare = getSquare(piece, board, boardState, Direction.QueenSide, 1);
        nextSquare.piece = rookSquare.piece;
        rookSquare.piece = null;
    }
};
var queenSideCastle = {
    moves: [{ direction: Direction.QueenSide, count: 2 }],
    canCapture: false,
    canMove: true,
    canJump: false,
    useDefaultConditions: false,
    conditions: [queenSideCastleCondition],
    postMoveActions: [postQueenSideCastle]
};
var kingSideCastle = {
    moves: [{ direction: Direction.KingSide, count: 2 }],
    canCapture: false,
    canMove: true,
    canJump: false,
    useDefaultConditions: false,
    conditions: [kingSideCastleCondition],
    postMoveActions: [postKingSideCastle]
};
function getHistory(piece, boardState, board) {
    return boardState.moveHistory.filter(function (history) { return history.piece.id === piece.id; });
}
function getSquare(piece, board, boardState, direction, count) {
    var coord = piece.getRelativeDestinations(direction, count)[0];
    return board.getSquare(coord, boardState);
}
var diag = {
    moves: [{ direction: Direction.Diagonal, count: 1 }],
    canJump: false,
    canMove: true,
    canCapture: true
};
var lat = {
    moves: [{ direction: Direction.Lateral, count: 1 }],
    canJump: false,
    canMove: true,
    canCapture: true
};
var king = {
    name: "King",
    movement: [diag, lat, kingSideCastle, queenSideCastle],
    canQueen: false,
    canSpawn: false,
    value: 10,
    notation: "k"
};
module.exports = king;
//# sourceMappingURL=king.js.map