import Chess = require("node-chess");
/**
 * If the board has the 'check' tag,
 */
function isMoveAllowed(board: Chess.Engine) {
    var isInCheck = board.boardState.tags["check"] === true;
    if (!isInCheck) return true;

    
}
