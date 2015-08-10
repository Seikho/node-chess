import Chess = require("node-chess");
/**
 * If the board has the 'check' tag,
 */
function isMoveAllowed(move: Chess.Move, boardState: Chess.BoardState, board: Chess.Engine) {
    var isInCheck = isCheck(boardState);
    if (!isInCheck) return true;

    var future = board.movePiece(move.from, move.to, boardState);
    var futureIsInCheck = isCheck(future);
    
    if (futureIsInCheck) return false;
    
}

function isCheckmate(move: Chess.Move, boardState: Chess.BoardState, board: Chess.Engine) {
    var isInCheck = isCheck(boardState);
    // need all available moves module
    
}

function isCheck(boardState: Chess.BoardState) {
    return boardState.tags["check"] === true;
}