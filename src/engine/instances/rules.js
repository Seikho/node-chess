/**
 * If the board has the 'check' tag,
 */
function isMoveAllowed(board) {
    var isInCheck = board.boardState.tags["check"] === true;
    if (!isInCheck)
        return true;
}
//# sourceMappingURL=rules.js.map