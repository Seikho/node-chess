var validatePath = require("./isValidPath");
// TODO: Desperately requires refactoring
function getMoves(coordinate, boardState) {
    var self = this;
    boardState = boardState || self.boardState;
    var square = self.getSquare(coordinate, boardState);
    // No piece, no moves.
    var piece = square.piece;
    if (!piece)
        return [];
    // We want all moves available on the entire board for calculation purposes
    // Therefore we leave this commented out
    // var isMoveablePiece = piece.isWhite === board.whitesTurn;
    //if (!isMoveablePiece) return [];
    var pathings = [];
    var movePatterns = piece.movement;
    var moves = [];
    // var newPathings = getPaths(coordinate, move, piece.isWhite);
    var validPathings = piece.transformCache.forEach(function (pathing) {
        var pathMoves = pathing.moves;
        var move = pathing.pattern;
        // If it's a vanilla move pattern, use the standard path validation strategy
        if (!move.conditions) {
            var validPath_1 = validatePath(self, boardState, piece, pathMoves, move);
            if (validPath_1) {
                moves.push({
                    from: coordinate,
                    to: validPath_1[validPath_1.length - 1],
                    postMoveActions: move.postMoveActions || [],
                    isWhite: piece.isWhite
                });
            }
            return;
        }
        // Otherwise we use the logic provided with the move pattern
        var validPath = !!move.useDefaultConditions ? validatePath(self, boardState, piece, pathMoves, move) : null;
        if (!validPath)
            return;
        var movePatternEvaluation = move.conditions.every(function (cond) { return cond(piece, boardState, self); });
        if (validPath && movePatternEvaluation) {
            moves.push({
                from: coordinate,
                to: validPath[validPath.length - 1],
                postMoveActions: move.postMoveActions || [],
                isWhite: piece.isWhite
            });
        }
    });
    return moves;
}
module.exports = getMoves;
//# sourceMappingURL=inferMoves.js.map