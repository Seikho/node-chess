/**
 * If the board has the 'check' tag,
 */
function isMoveAllowed(board: Chess.Engine) {
    var isInCheck = board.tags.check === true;
    if (!isInCheck) return true;

}
