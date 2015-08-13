/**
 * If the board has the 'check' tag,
 */
exports.allowedMoves = {
    action: function (piece, boardState, board) {
        var isLegit = function (move) { return isMoveAllowed(move, boardState); };
        var legitMoves = boardState.moves.filter(isLegit);
        return legitMoves;
    }
};
exports.checkmatePostMove = {
    action: function (piece, boardState, board) {
        var isGameOver = isCheckmate(boardState, board);
        if (!isGameOver)
            return false;
        boardState.winnerIsWhite = !boardState.whitesTurn;
        boardState.moves = [];
        return true;
    }
};
exports.stalematePostMove = {
    action: function (piece, boardState, board) {
        var isGameOver = isStalement(boardState, board);
        if (!isGameOver)
            return false;
        boardState.winnerIsWhite = !boardState.whitesTurn;
        boardState.moves = [];
        return true;
    }
};
function isMoveAllowed(move, boardState) {
    var self = this;
    var isInCheck = isCheck(boardState.whitesTurn, boardState);
    if (!isInCheck)
        return true;
    var future = self.movePiece(move.from, move.to, boardState);
    var futureIsInCheck = isCheck(!boardState.whitesTurn, future);
    if (futureIsInCheck)
        return false;
}
function isCheckmate(boardState, board) {
    var isInCheck = isCheck(!boardState.whitesTurn, boardState);
    if (!isInCheck)
        return false;
    var moves = boardState
        .moves
        .filter(function (move) { return move.isWhite === boardState.whitesTurn; });
    var hasMoves = moves.length > 0;
    return isInCheck && !hasMoves;
}
function isStalement(boardState, board) {
    var isInCheck = isCheck(boardState.whitesTurn, boardState);
    if (isInCheck)
        return false;
    var moves = boardState
        .moves
        .filter(function (move) { return move.isWhite === boardState.whitesTurn; });
    var hasMoves = moves.length > 0;
    return !isInCheck && !hasMoves;
}
function isCheck(checkWhite, boardState) {
    var kingSquare;
    boardState.ranks.forEach(function (rank) {
        rank.squares.forEach(function (square) {
            if (!square.piece)
                return;
            var isKing = square.piece.name === "King" && square.piece.isWhite === !checkWhite;
            if (isKing)
                kingSquare = square;
        });
    });
    if (!kingSquare)
        throw new Error("Unable to locate opposing king");
    var attackFilter = function (move) { return move.to.file === kingSquare.file && move.to.rank === kingSquare.rank; };
    var kingAttackers = boardState.moves.filter(attackFilter);
    var isInCheck = kingAttackers.length > 0;
    return isInCheck;
}
//# sourceMappingURL=rules.js.map