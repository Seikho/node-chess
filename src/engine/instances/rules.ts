import Chess = require("node-chess");
/**
 * If the board has the 'check' tag,
 */

export var checkmatePostMove = {
    action: (piece, boardState: Chess.BoardState, board: Chess.Engine) => {
        var isGameOver = isCheckmate(boardState, board);
        if (!isGameOver) return false;
        
        boardState.winnerIsWhite = !boardState.whitesTurn;
        boardState.moves = [];
        return true;
    }
}

export var stalematePostMove = {
    action: (piece, boardState: Chess.BoardState, board: Chess.Engine) => {
        var isGameOver = isStalement(boardState, board);
        if (!isGameOver) return false;

        boardState.winnerIsWhite = !boardState.whitesTurn;
        boardState.moves = [];
        return true;
    }
}

function isMoveAllowed(move: Chess.Move, boardState: Chess.BoardState, board: Chess.Engine) {

    if (boardState.whitesTurn !== move.isWhite) return false;
    var isInCheck = isCheck(boardState.whitesTurn, boardState);
    if (!isInCheck) return true;

    try {
        var future = board.movePiece(move.from, move.to, boardState);
        var futureIsInCheck = isCheck(boardState.whitesTurn, future);

        return !futureIsInCheck;

    } catch (ex) {
        return false;
    }
}

function allowedMoves(boardState: Chess.BoardState, board: Chess.Engine) {
    var isLegit = move => isMoveAllowed(move, boardState, board);
    var legitMoves = boardState.moves.filter(isLegit);
    return legitMoves;
}

function isCheckmate(boardState: Chess.BoardState, board: Chess.Engine) {
    var isInCheck = isCheck(boardState.whitesTurn, boardState);
    if (!isInCheck) return false;

    var moves = allowedMoves(boardState, board);

    var hasMoves = moves.length > 0;
    return isInCheck && !hasMoves;
}

function isStalement(boardState: Chess.BoardState, board: Chess.Engine) {
    var isInCheck = isCheck(boardState.whitesTurn, boardState);
    if (isInCheck) return false;

    var moves = allowedMoves(boardState, board);

    var hasMoves = moves.length > 0;
    return !isInCheck && !hasMoves;
}

function isCheck(checkWhite: boolean, boardState: Chess.BoardState) {
    var kingSquare: Chess.Square;

    boardState.ranks.forEach(rank => {
        rank.squares.forEach(square => {
            if (!square.piece) return;
            var isKing = square.piece.name === "King" && square.piece.isWhite === checkWhite;
            if (isKing) kingSquare = square;
        });
    });

    if (!kingSquare) throw new Error("Unable to locate opposing king");

    var attackFilter = (move: Chess.Move) => move.to.file === kingSquare.file && move.to.rank === kingSquare.rank;
    var kingAttackers = boardState.moves.filter(attackFilter);

    var isInCheck = kingAttackers.length > 0;
    return isInCheck;
}