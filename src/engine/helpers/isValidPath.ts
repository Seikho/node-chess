import Chess = require("node-chess");
export = isValidPath;

function isValidPath(board: Chess.Engine, boardState: Chess.BoardState, piece: Chess.Piece, path: Chess.Coordinate[], move: Chess.MovePattern): Chess.Coordinate[] {
    // TODO: Rules API would be used here
    var isWhite = !!piece.isWhite;
    var appliedPath = applyPaths(piece.location, path);

    var isInBounds = appliedPath.every(p => {
        return p.file > 0 && p.file <= 8
            && p.rank > 0 && p.rank <= 8;
    });
    
    if (!isInBounds) return null;

    var lastCoordinateIndex = appliedPath.length - 1;
    var lastCoordinate = appliedPath[lastCoordinateIndex];
    var lastSquare = board.getSquare(lastCoordinate, boardState);
    if (!lastSquare) return null;
    
    // Optimisations

    // Ensure all squares leading up to the destination are vacant
    if (!move.canJump) {
        var every = (coord: Chess.Coordinate) => {
            var sq = board.getSquare(coord, boardState);
            if (!sq) return false;
            return !board.getSquare(coord, boardState).piece
        };

        var isPathVacant = appliedPath.slice(0, -1).every(every);
        if (!isPathVacant) return null;
    }

    // Destination occupied optimisations
    if (!!lastSquare.piece) {

        // Can't land on your own piece
        if (!!isWhite === !!lastSquare.piece.isWhite) return null;

        // Must be able to capture if pieces are opposing colours
        if (!move.canCapture) return null;
    }

    // Destination unoccupied optimisations
    else {
        if (!move.canMove) return null;
    }

    return appliedPath;
}

function applyPaths(start: Chess.Coordinate, path: Chess.Coordinate[]): Chess.Coordinate[] {
    var first = {
        file: start.file + path[0].file,
        rank: start.rank + path[0].rank
    };

    var finalPath = [first];

    if (!path[1]) return finalPath;

    finalPath.push({
        file: first.file + path[1].file,
        rank: first.rank + path[1].rank
    });

    return finalPath;
}