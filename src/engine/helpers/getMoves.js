var getPaths = require("./getPaths");
function getMoves(coordinate) {
    var stopwatch = Date.now();
    var self = this;
    var square = self.getSquare(coordinate);
    // No piece, no moves.
    var piece = square.piece;
    if (!piece)
        return [];
    if (piece.isWhite !== self.whitesTurn)
        return [];
    var bounds = { file: this.fileCount, rank: this.rankCount };
    function isValidPath(path, move) {
        // TODO: Rules API would be used here
        var isWhite = !!piece.isWhite;
        var lastCoordinateIndex = path.length - 1;
        var lastCoordinate = path[lastCoordinateIndex];
        var lastSquare = self.getSquare(lastCoordinate);
        // Optimisations
        // Ensure all squares leading up to the destination are vacant
        if (!move.canJump) {
            var isPathVacant = path.slice(0, -1).every(function (coord) { return !self.getSquare(coord).piece; });
            if (!isPathVacant)
                return false;
        }
        // Destination occupied optimisations        
        if (!!lastSquare.piece) {
            // Can't land on your own piece
            if (!!isWhite === !!lastSquare.piece.isWhite)
                return false;
            // Must be able to capture if pieces are opposing colours
            if (!move.canCapture)
                return false;
        }
        else {
            if (!move.canMove)
                return false;
        }
        return true;
    }
    var pathings = [];
    var movePatterns = piece.movement.slice(0);
    var moves = [];
    movePatterns.forEach(function (move) {
        var newPathings = getPaths(coordinate, move, piece.isWhite, bounds);
        var validPathings = newPathings.forEach(function (pathing) {
            // If it's a vanilla move pattern, use the standard path validation strategy
            if (!move.conditions && isValidPath(pathing, move)) {
                moves.push({
                    to: pathing[pathing.length - 1],
                    postMoveActions: []
                });
                return;
            }
            // Otherwise we use the logic provided with the move pattern
            var defaultValidPath = move.useDefaultConditions ? isValidPath(pathing, move) : true;
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