/**
 * Intentionally not using any closures to improve performance
 * This code can potentially be called thousands of times after a single move has been played
 */
function infer(piece, boardState) {
    var self = this;
    boardState = boardState || self.boardState;
    var moves = [];
    for (var key in piece.movement) {
        var move = piece.movement[key];
        if (move.transforms)
            moves = moves.concat(processTransform(move, piece, boardState, self));
        else
            moves = moves.concat(processIncrementer(move, piece, boardState, self));
    }
    return moves;
}
function processTransform(move, piece, boardState, board) {
    var modifier = piece.isWhite ? 1 : -1;
    var steps = [piece.location];
    var transforms = move.transforms;
    if (!Array.isArray(transforms))
        transforms = [transforms];
    for (var x = 0; x < transforms.length; x++) {
        var transform = transforms[x];
        steps.push(applyTransform(steps[x], transform, modifier));
    }
    var finalCoord = steps[steps.length - 1];
    var finalSquare = board.getSquare(finalCoord, boardState);
    var finalSquarePiece = finalSquare.piece;
    if (move.canCapture && finalSquarePiece.isWhite != piece.isWhite)
        return null;
    if (move.canMove && finalSquarePiece)
        return null;
    for (var x = 1; x < steps.length; x++) {
        var prev = steps[x - 1];
        var step = steps[x];
        var transform = transforms[x - 1];
        if (step !== finalCoord) {
            //TODO: Allow 'squaresBetween' here			
            if (transform.canJump)
                continue;
            var canMove = checkBetween(prev, step, piece, transform, boardState, board);
            if (!canMove)
                return null;
            continue;
        }
        if (transform.canJump)
            return [step];
        // WIP: Need to check between squares again...
        // For loop above needs to be converted to a function to be re-used for this section
        var canMove = checkBetween(prev, step, piece, transform, boardState, board);
        if (!canMove)
            return null;
        return [step];
    }
}
function processIncrementer(move, piece, state, board) {
    return [];
}
// TODO: Shrink function signature. Take an object instead
function checkBetween(start, end, piece, transform, boardState, board) {
    var difference = {
        file: Math.abs(start.file - end.file),
        rank: Math.abs(start.rank - end.rank)
    };
    if (difference.file > 0 && difference.rank > 0)
        throw new Error("Invalid non-jumpable move in " + piece.name + " definition: " + transform);
    if (difference.file === 1 || difference.rank === 1)
        return false;
    var dimension = difference.file > 0 ? "file" : "rank";
    var inc = end[dimension] > start[dimension] ? -1 : 1;
    // Ensure all squares between current and previous are vacant
    // Avoid closures to avoid heap allocations
    for (var y = end[dimension]; y !== start[dimension]; y += inc) {
        var between = { file: end.file, rank: end.rank };
        between[dimension] += inc;
        var sq = board.getSquare(between, boardState);
        // If a square is occupied, the move is not valid
        if (sq.piece)
            return false;
    }
    // All squares are vacant
    return true;
}
function applyTransform(coordinate, transform, modifier) {
    if (transform.absolute)
        modifier = 1;
    var file = coordinate.file + (transform.file * modifier);
    var rank = coordinate.rank + (transform.rank * modifier);
    return {
        file: file,
        rank: rank
    };
}
//# sourceMappingURL=newInferMoves.js.map