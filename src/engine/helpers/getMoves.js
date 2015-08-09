var getPaths = require("./getPaths");
var isValidPath = require("./isValidPath");
// TODO: Desperately requires refactoring
function getMoves(coordinate, boardState) {
    var stopwatch = Date.now(); // Benchmarking
    var self = this;
    var square = self.getSquare(coordinate, boardState);
    // No piece, no moves.
    var piece = square.piece;
    if (!piece)
        return [];
    // We want all moves available on the entire board for calculation purposes
    // Therefore we leave this commented out
    // var isMoveablePiece = piece.isWhite === board.whitesTurn;
    //if (!isMoveablePiece) return [];
    var bounds = { file: self.fileCount, rank: self.rankCount };
    var pathings = [];
    var movePatterns = piece.movement.slice(0);
    var moves = [];
    movePatterns.forEach(function (move) {
        var newPathings = getPaths(coordinate, move, piece.isWhite, bounds);
        var validPathings = newPathings.forEach(function (pathing) {
            // If it's a vanilla move pattern, use the standard path validation strategy
            if (!move.conditions) {
                if (!isValidPath(self, piece, pathing, move))
                    return;
                moves.push({
                    to: pathing[pathing.length - 1],
                    postMoveActions: []
                });
            }
            // Otherwise we use the logic provided with the move pattern
            var defaultValidPath = !!move.useDefaultConditions ? isValidPath(self, piece, pathing, move) : true;
            var movePatternEvaluation = move.conditions.every(function (cond) { return cond(piece, self); });
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