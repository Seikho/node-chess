import Chess = require("node-chess");
import enums = require("../../enums");
import Direction = enums.Direction;
export = king;

var queenSideCastleCondition: Chess.MovePatternConditional = (piece, boardState, board) => {
    if (piece.moveHistory.length > 0) return false;
    var f = num => getSquare(piece, board, boardState, Direction.QueenSide, num);
    
    var queenSquare = f(1);
    var bishopSquare = f(2);
    var knightSquare = f(3);
    var rookSquare = f(4);

    var squaresAreVacant = !queenSquare.piece
        && !bishopSquare.piece
        && !knightSquare.piece
        && !!rookSquare.piece;
    if (!squaresAreVacant) return false;

    var rookHasMoved = rookSquare.piece.moveHistory.length > 0;
    return !rookHasMoved;
}

var kingSideCastleCondition: Chess.MovePatternConditional = (piece, boardState, board) => {
    if (piece.moveHistory.length > 0) return false;
    var f = num => getSquare(piece, board, boardState, Direction.KingSide, num);
    var bishopSquare = f(1);
    var knightSquare = f(2);
    var rookSquare = f(3);

    var squaresAreVacant = !bishopSquare.piece
        && !knightSquare.piece
        && !!rookSquare.piece;
    if (!squaresAreVacant) return false;

    var rookHasMoved = rookSquare.piece.moveHistory.length > 0;
    return !rookHasMoved;
}

var postQueenSideCastle: Chess.MoveFunction = {
    action: (piece, boardState, board) => {
        var rookSquare = getSquare(piece, board, boardState, Direction.QueenSide, 2);
        var nextSquare = getSquare(piece, board, boardState, Direction.KingSide, 1);
        nextSquare.piece = rookSquare.piece;
        rookSquare.piece = null;
    }
}

var postKingSideCastle: Chess.MoveFunction = {
    action: (piece, boardState, board) => {
        var rookSquare = getSquare(piece, board, boardState, Direction.KingSide, 1);
        var nextSquare = getSquare(piece, board, boardState, Direction.QueenSide, 1);
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

function getSquare(piece: Chess.BasePiece, board: Chess.Engine, boardState: Chess.BoardState, direction: Direction, count: number) {
    var coord = piece.getRelativeDestinations(direction, count)[0];
    return board.getSquare(coord, boardState);
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
