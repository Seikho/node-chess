/**
 * Intentionally not using any closures to improve performance
 * This code can potentially be called thousands of times after a single move has been played
 */
function infer(piece, state) {
    var board = this;
    state = state || board.boardState;
    var moves = [];
    for (var key in piece.movement) {
        var move = piece.movement[key];
        var canProcess = move.preCondition(piece, state, board);
        if (move.transforms) {
            // Pre-conditions only apply to 
            if (!canProcess)
                continue;
            var newMove = processTransform(move, piece, state, board);
            if (newMove)
                moves.push(newMove);
        }
        else {
            var newMoves = processIncrementer(move, piece, state, board);
            if (move.postMoveAction) {
                for (var x = 0; x < newMoves.length; x++) {
                    newMoves[x].postMoveActions = [move.postMoveAction];
                }
            }
            moves = moves.concat(newMoves);
        }
        ;
    }
    return moves;
}
function processTransform(move, piece, boardState, board) {
    var modifier = piece.isWhite ? 1 : -1;
    var finalMove = {
        from: piece.location,
        to: null,
    };
    var canSkipLogic = move.preCondition && !move.useDefaultConditions;
    if (move.postMoveAction)
        finalMove.postMoveActions = [move.postMoveAction];
    var steps = [piece.location];
    var transforms = move.transforms;
    if (!Array.isArray(transforms))
        transforms = [transforms];
    for (var x = 0; x < transforms.length; x++) {
        var transform = transforms[x];
        steps.push(applyTransform(steps[x], transform, modifier));
    }
    var finalCoord = steps[steps.length - 1];
    finalMove.to = finalCoord;
    // Pre-condition has passed and useDefaultConditions is false.
    if (canSkipLogic)
        return finalMove;
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
            return finalMove;
        var canMove = checkBetween(prev, step, piece, transform, boardState, board);
        if (!canMove)
            return finalMove;
    }
    return null;
}
function processIncrementer(move, piece, state, board) {
    var current = { file: piece.location.file, rank: piece.location.rank };
    var modifier = piece.isWhite || move.incrementer.absolute ? 1 : -1;
    var file = move.incrementer.file * modifier;
    var rank = move.incrementer.rank * modifier;
    var validMoves = [];
    while (true) {
        current.file += file;
        current.rank += rank;
        if (!isInBounds(current))
            break;
        var square = board.getSquare(current, state);
        if (square.piece) {
            if (square.piece.isWhite !== piece.isWhite) {
                if (!move.incrementer.canJump)
                    break;
                validMoves.push({ from: piece.location, to: { file: current.file, rank: current.rank } });
                continue;
            }
            if (move.canCapture) {
                validMoves.push({ from: piece.location, to: { file: current.file, rank: current.rank } });
                continue;
            }
            break;
        }
        if (move.canMove) {
            validMoves.push({ from: piece.location, to: { file: current.file, rank: current.rank } });
            continue;
        }
        break;
    }
    return validMoves;
}
function isInBounds(position) {
    return position.file > 0 && position.file <= 8
        && position.rank > 0 && position.rank <= 8;
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