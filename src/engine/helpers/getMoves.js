var getPaths = require("./getPaths");
var isValidPath = require("./isValidPath");
// TODO: Desperately requires refactoring
function getMoves(coordinate) {
    var stopwatch = Date.now(); // Benchmarking
    var board = this;
    var square = board.getSquare(coordinate);
    // No piece, no moves.
    var piece = square.piece;
    if (!piece)
        return [];
    var isMoveablePiece = piece.isWhite === board.whitesTurn;
    if (!isMoveablePiece)
        return [];
    var bounds = { file: this.fileCount, rank: this.rankCount };
    var pathings = [];
    var movePatterns = piece.movement.slice(0);
    var moves = [];
    movePatterns.forEach(function (move) {
        var newPathings = getPaths(coordinate, move, piece.isWhite, bounds);
        var validPathings = newPathings.forEach(function (pathing) {
            // If it's a vanilla move pattern, use the standard path validation strategy
            if (!move.conditions) {
                if (isValidPath(board, piece, pathing, move)) {
                    moves.push({
                        to: pathing[pathing.length - 1],
                        postMoveActions: []
                    });
                }
                return;
            }
            // Otherwise we use the logic provided with the move pattern
            var defaultValidPath = !!move.useDefaultConditions ? isValidPath(board, piece, pathing, move) : true;
            var movePatternEvaluation = move.conditions.every(function (cond) { return cond(piece, board); });
            if (defaultValidPath && movePatternEvaluation) {
                moves.push({
                    to: pathing[pathing.length - 1],
                    postMoveActions: move.postMoveActions || []
                });
            }
        });
    });
    return moves;
}
module.exports = getMoves;
//# sourceMappingURL=getMoves.js.map