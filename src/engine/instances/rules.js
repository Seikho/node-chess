/**
 * If the board has the 'check' tag,
 */
function isMoveAllowed(move, boardState, board) {
    var isInCheck = isCheck(boardState);
    if (!isInCheck)
        return true;
    var future = board.movePiece(move.from, move.to, boardState);
    var futureIsInCheck = isCheck(future);
    if (futureIsInCheck)
        return false;
}
function isCheckmate(move, boardState, board) {
    var isInCheck = isCheck(boardState);
    // need all available moves module
}
function isCheck(boardState) {
    var oppositeKing;
    boardState.ranks.forEach(function (rank) {
        rank.squares.forEach(function (square) {
            var isOpposingKing = square.piece.name === "King" && square.piece.isWhite === !boardState.whitesTurn;
            if (isOpposingKing)
                oppositeKing = square;
        });
    });
    if (!oppositeKing)
        throw new Error("Unable to locate opposing king");
    var attackFilter = function (move) { return move.to.file === oppositeKing.file && move.to.rank === oppositeKing.rank; };
    var kingAttackers = boardState.moves.filter(attackFilter);
    var isInCheck = kingAttackers.length > 0;
    return isInCheck;
}
//# sourceMappingURL=rules.js.map