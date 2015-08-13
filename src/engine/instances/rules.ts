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
    var oppositeKing: Chess.Square;
    boardState.ranks.forEach(rank => {
       rank.squares.forEach(square => {
          var isOpposingKing = square.piece.name === "King" && square.piece.isWhite === !boardState.whitesTurn; 
          if (isOpposingKing) oppositeKing = square; 
       });
    });
    
    if (!oppositeKing) throw new Error("Unable to locate opposing king");
   
    var attackFilter = (move: Chess.Move) => move.to.file === oppositeKing.file && move.to.rank === oppositeKing.rank; 
    var kingAttackers = boardState.moves.filter(attackFilter);
    
    var isInCheck = kingAttackers.length > 0;
    return isInCheck;    
}