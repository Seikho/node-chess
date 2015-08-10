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
    return boardState.tags["check"] === true;
}
//# sourceMappingURL=rules.js.map