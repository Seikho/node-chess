import Chess = require("node-chess");
/**
 * If the board has the 'check' tag,
 */
 
export function allowedMoves(boardState: Chess.BoardState) {
    var self: Chess.Engine = this;
    var isLegit = move => isMoveAllowed(move, boardState);
    
    var legitMoves = boardState.moves.filter(isLegit);
    return legitMoves;
}

export function checkmatePostMove(piece, boardState: Chess.BoardState, board: Chess.Engine) {
    var isGameOver = isCheckmate(boardState, board);
    if (!isGameOver) return false;
    
    boardState.winnerIsWhite = !boardState.whitesTurn;
    boardState.moves = [];
    return true;
}

export function stalematePostMove(piece, boardState: Chess.BoardState, board: Chess.Engine) {
    var isGameOver = isStalement(boardState, board);
    if (!isGameOver) return false;
    
    boardState.winnerIsWhite = !boardState.whitesTurn;
    boardState.moves = [];
    return true;
}
 
function isMoveAllowed(move: Chess.Move, boardState: Chess.BoardState) {
    var self: Chess.Engine = this;
    var isInCheck = isCheck(boardState.whitesTurn, boardState);
    if (!isInCheck) return true;
    
    var future = self.movePiece(move.from, move.to, boardState);
    var futureIsInCheck = isCheck(!boardState.whitesTurn, future);

    if (futureIsInCheck) return false;    
}

function isCheckmate(boardState: Chess.BoardState, board: Chess.Engine) {
    var isInCheck = isCheck(!boardState.whitesTurn, boardState);
    if (!isInCheck) return false;

    var moves = boardState
        .moves
        .filter(move => move.isWhite === boardState.whitesTurn);

    var hasMoves = moves.length > 0;
    return isInCheck && !hasMoves;
}

function isStalement(boardState: Chess.BoardState, board: Chess.Engine) {
    var isInCheck = isCheck(boardState.whitesTurn, boardState);
    if (isInCheck) return false;

    var moves = boardState
        .moves
        .filter(move => move.isWhite === boardState.whitesTurn);

    var hasMoves = moves.length > 0;
    return !isInCheck && !hasMoves;
}

function isCheck(checkWhite: boolean, boardState: Chess.BoardState) {
    var kingSquare: Chess.Square;

    boardState.ranks.forEach(rank => {
        rank.squares.forEach(square => {
            var isKing = square.piece.name === "King" && square.piece.isWhite === !checkWhite;
            if (isKing) kingSquare = square;
        });
    });

    if (!kingSquare) throw new Error("Unable to locate opposing king");

    var attackFilter = (move: Chess.Move) => move.to.file === kingSquare.file && move.to.rank === kingSquare.rank;
    var kingAttackers = boardState.moves.filter(attackFilter);

    var isInCheck = kingAttackers.length > 0;
    return isInCheck;
}