var queenSideCastleCondition = function (piece, board) {
    if (piece.moveHistory.length > 0)
        return false;
    var queenSquare = getSquare(piece, board, 15 /* QueenSide */, 1);
    var bishopSquare = getSquare(piece, board, 15 /* QueenSide */, 2);
    var knightSquare = getSquare(piece, board, 15 /* QueenSide */, 3);
    var rookSquare = getSquare(piece, board, 15 /* QueenSide */, 4);
    if (!!queenSquare.piece || !!bishopSquare.piece || !!knightSquare.piece)
        return false;
    if (!rookSquare.piece)
        return false;
    return rookSquare.piece.moveHistory.length === 0;
};
var kingSideCastleCondition = function (piece, board) {
    if (piece.moveHistory.length > 0)
        return false;
    var bishopSquare = getSquare(piece, board, 14 /* KingSide */, 1);
    var knightSquare = getSquare(piece, board, 14 /* KingSide */, 2);
    var rookSquare = getSquare(piece, board, 14 /* KingSide */, 3);
    if (!!bishopSquare.piece || !!knightSquare.piece)
        return false;
    if (!rookSquare.piece)
        return false;
    return rookSquare.piece.moveHistory.length === 0;
};
var postQueenSideCastle = {
    action: function (piece, board) {
        var rookSquare = getSquare(piece, board, 15 /* QueenSide */, 2);
        var nextSquare = getSquare(piece, board, 14 /* KingSide */, 1);
        nextSquare.piece = rookSquare.piece;
        rookSquare.piece = null;
    }
};
var postKingSideCastle = {
    action: function (piece, board) {
        var rookSquare = getSquare(piece, board, 14 /* KingSide */, 1);
        var nextSquare = getSquare(piece, board, 15 /* QueenSide */, 1);
        nextSquare.piece = rookSquare.piece;
        rookSquare.piece = null;
    }
};
var queenSideCastle = {
    moves: [{ direction: 15 /* QueenSide */, count: 2 }],
    canCapture: false,
    canMove: true,
    canJump: false,
    useDefaultConditions: false,
    conditions: [queenSideCastleCondition],
    postMoveActions: [postQueenSideCastle]
};
var kingSideCastle = {
    moves: [{ direction: 14 /* KingSide */, count: 2 }],
    canCapture: false,
    canMove: true,
    canJump: false,
    useDefaultConditions: false,
    conditions: [kingSideCastleCondition],
    postMoveActions: [postKingSideCastle]
};
function getSquare(piece, board, direction, count) {
    var coord = piece.getRelativeDestinations(direction, count)[0];
    return board.getSquare(coord);
}
var diag = {
    moves: [{ direction: 9 /* Diagonal */, count: 1 }],
    canJump: false,
    canMove: true,
    canCapture: true
};
var lat = {
    moves: [{ direction: 6 /* Lateral */, count: 1 }],
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