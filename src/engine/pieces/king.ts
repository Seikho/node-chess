import Chess = require("node-chess");
import enums = require("../../enums");
import Direction = enums.Direction;
export = king;

var queenSideCastleCondition: Chess.MovePatternConditional = (piece, board) => {
    if (piece.moveHistory.length > 0) return false;

    var queenSquare = getSquare(piece, board, Direction.QueenSide, 1);
    var bishopSquare = getSquare(piece, board, Direction.QueenSide, 2);
    var knightSquare = getSquare(piece, board, Direction.QueenSide, 3);
    var rookSquare = getSquare(piece, board, Direction.QueenSide, 4);

    var squaresAreVacant = !queenSquare.piece
        && !bishopSquare.piece
        && !knightSquare.piece
        && !!rookSquare.piece;
    if (!squaresAreVacant) return false;

    var rookHasMoved = rookSquare.piece.moveHistory.length > 0;
    return !rookHasMoved;
}

var kingSideCastleCondition: Chess.MovePatternConditional = (piece, board) => {
    if (piece.moveHistory.length > 0) return false;

    var bishopSquare = getSquare(piece, board, Direction.KingSide, 1);
    var knightSquare = getSquare(piece, board, Direction.KingSide, 2);
    var rookSquare = getSquare(piece, board, Direction.KingSide, 3);

    var squaresAreVacant = !bishopSquare.piece
        && !knightSquare.piece
        && !!rookSquare.piece;
    if (!squaresAreVacant) return false;

    var rookHasMoved = rookSquare.piece.moveHistory.length > 0;
    return !rookHasMoved;
}

var postQueenSideCastle: Chess.PostMoveFunction = {
    action: (piece, board) => {
        var rookSquare = getSquare(piece, board, Direction.QueenSide, 2);
        var nextSquare = getSquare(piece, board, Direction.KingSide, 1);
        nextSquare.piece = rookSquare.piece;
        rookSquare.piece = null;
    }
}

var postKingSideCastle: Chess.PostMoveFunction = {
    action: (piece, board) => {
        var rookSquare = getSquare(piece, board, Direction.KingSide, 1);
        var nextSquare = getSquare(piece, board, Direction.QueenSide, 1);
        nextSquare.piece = rookSquare.piece;
        rookSquare.piece = null;
    }
}

var queenSideCastle: Chess.MovePattern = {
    moves: [{ direction: Direction.QueenSide, count: 2 }],
    canCapture: false,
    canMove: true,
    canJump: false,
    useDefaultConditions: false,
    conditions: [queenSideCastleCondition],
    postMoveActions: [postQueenSideCastle]
}

var kingSideCastle: Chess.MovePattern = {
    moves: [{ direction: Direction.KingSide, count: 2 }],
    canCapture: false,
    canMove: true,
    canJump: false,
    useDefaultConditions: false,
    conditions: [kingSideCastleCondition],
    postMoveActions: [postKingSideCastle]
}

function getSquare(piece: Chess.BasePiece, board: Chess.Engine, direction: Direction, count: number) {
    var coord = piece.getRelativeDestinations(direction, count)[0];
    return board.getSquare(coord);
}

var diag = {
    moves: [{ direction: Direction.Diagonal, count: 1 }],
    canJump: false,
    canMove: true,
    canCapture: true
}

var lat = {
    moves: [{ direction: Direction.Lateral, count: 1 }],
    canJump: false,
    canMove: true,
    canCapture: true
}

var king = {
    name: "King",
    movement: [diag, lat, kingSideCastle, queenSideCastle],
    canQueen: false,
    canSpawn: false,
    value: 10,
    notation: "k"
}
