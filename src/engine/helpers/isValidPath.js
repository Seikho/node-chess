function isValidPath(board, boardState, piece, path, move) {
    // TODO: Rules API would be used here
    var isWhite = !!piece.isWhite;
    var appliedPath = applyPaths(piece.location, path);
    var lastCoordinateIndex = appliedPath.length - 1;
    var lastCoordinate = appliedPath[lastCoordinateIndex];
    var lastSquare = board.getSquare(lastCoordinate, boardState);
    if (!lastSquare)
        return null;
    // Optimisations
    // Ensure all squares leading up to the destination are vacant
    if (!move.canJump) {
        var every = function (coord) {
            var sq = board.getSquare(coord, boardState);
            if (!sq)
                return false;
            return !board.getSquare(coord, boardState).piece;
        };
        var isPathVacant = appliedPath.slice(0, -1).every(every);
        if (!isPathVacant)
            return null;
    }
    // Destination occupied optimisations
    if (!!lastSquare.piece) {
        // Can't land on your own piece
        if (!!isWhite === !!lastSquare.piece.isWhite)
            return null;
        // Must be able to capture if pieces are opposing colours
        if (!move.canCapture)
            return null;
    }
    else {
        if (!move.canMove)
            return null;
    }
    return appliedPath;
}
function applyPaths(start, path) {
    var first = {
        file: start.file + path[0].file,
        rank: start.rank + path[0].rank
    };
    var finalPath = [first];
    if (!path[1])
        return finalPath;
    finalPath.push({
        file: first.file + path[1].file,
        rank: first.rank + path[1].rank
    });
    return finalPath;
}
module.exports = isValidPath;
//# sourceMappingURL=isValidPath.js.map