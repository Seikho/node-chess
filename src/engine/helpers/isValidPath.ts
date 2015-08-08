import Chess = require("node-chess");
export = isValidPath;

function isValidPath(board: Chess.Engine, piece: Chess.Piece, path: Chess.Coordinate[], move: Chess.MovePattern): boolean {
    // TODO: Rules API would be used here
    var isWhite = !!piece.isWhite;
    var lastCoordinateIndex = path.length - 1;
    var lastCoordinate = path[lastCoordinateIndex];
    var lastSquare = board.getSquare(lastCoordinate);

    // Optimisations

    // Ensure all squares leading up to the destination are vacant
    if (!move.canJump) {
        var isPathVacant = path.slice(0, -1).every(coord => !board.getSquare(coord).piece);
        if (!isPathVacant) return false;
    }

    // Destination occupied optimisations
    if (!!lastSquare.piece) {

        // Can't land on your own piece
        if (!!isWhite === !!lastSquare.piece.isWhite) return false;

        // Must be able to capture if pieces are opposing colours
        if (!move.canCapture) return false;
    }

    // Destination unoccupied optimisations
    else {
        if (!move.canMove) return false;
    }

    return true;
}