var Chess = require("node-chess");
var Dir = Chess.Direction;
var up = makeMove(0, 1);
var down = makeMove(0, -1);
var left = makeMove(-1, 0);
var right = makeMove(1, 0);
var upLeft = makeMove(-1, 1);
var upRight = makeMove(1, 1);
var downLeft = makeMove(-1, -1);
var downRight = makeMove(1, -1);
var queenSideCastle = {
    canMove: true,
    transforms: { file: -2, rank: 0, absolute: true },
    preCondition: castle(Dir.QueenSide, 4),
    postMoveAction: postCastle(Dir.QueenSide, 2)
};
var kingSideCastle = {
    canMove: true,
    transforms: { file: 2, rank: 0, absolute: true },
    preCondition: castle(Dir.KingSide, 3),
    postMoveAction: postCastle(Dir.KingSide, 1)
};
function makeMove(file, rank) {
    return {
        canCapture: true,
        canMove: true,
        transforms: { file: file, rank: rank }
    };
}
function castle(dir, count) {
    return function (piece, state, board) {
        // King is not allowed to have moved
        var kingMoves = state.moveHistory.filter(function (moves) { return moves.piece.id === piece.id; });
        if (kingMoves.length > 0)
            return false;
        var coord = piece.getRelativeDestinations(dir, count)[0];
        var square = board.getSquare(coord, state);
        // Piece must be a rook and the same colour..
        if (square.piece == null)
            return false;
        if (square.piece.name !== "Rook")
            return false;
        if (square.piece.isWhite !== piece.isWhite)
            return false;
        // Rook must not have moved
        var rookMoves = state.moveHistory.filter(function (move) { return move.piece.id === square.piece.id; });
        if (rookMoves.length > 0)
            return false;
        // All squares between the King and the Rook must be vacant
        var betweenSquares = [];
        for (var x = 1; x < count; x++) {
            betweenSquares.push(board.getSquare(piece.getRelativeDestinations(dir, x)[0], state));
        }
        var allVacant = betweenSquares.every(function (sq) { return sq.piece == null; });
        return allVacant;
    };
}
function postCastle(dir, count) {
    return {
        action: function (piece, state, board) {
            var oppositeDir = oppositeDirection(dir);
            var rookSquare = board.getSquare(piece.getRelativeDestinations(dir, count)[0], state);
            var newRookSquare = board.getSquare(piece.getRelativeDestinations(oppositeDir, 1)[0], state);
            newRookSquare.piece = rookSquare.piece;
            rookSquare.piece = null;
        }
    };
}
function oppositeDirection(dir) {
    return dir === Dir.QueenSide
        ? Dir.KingSide
        : Dir.QueenSide;
}
var king = {
    notation: "k",
    name: "King",
    movement: [upLeft, upRight, downLeft, downRight, up, down, left, right, queenSideCastle, kingSideCastle],
    canQueen: false,
    canSpawn: false,
    value: 10
};
module.exports = king;
//# sourceMappingURL=king.js.map