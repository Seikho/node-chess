import getPaths = require("./getPaths");
import isValidPath = require("./isValidPath")
export = getMoves;

// TODO: Desperately requires refactoring
function getMoves(coordinate: Chess.Coordinate): Chess.Move[] {
    var stopwatch = Date.now(); // Benchmarking
    var board: Chess.Engine = this;
    var square: Chess.Square = board.getSquare(coordinate);

    // No piece, no moves.
    var piece = square.piece;
    if (!piece) return [];
    
    var isMoveablePiece = piece.isWhite === board.whitesTurn;
    if (!isMoveablePiece) return [];

    var bounds = { file: this.fileCount, rank: this.rankCount };

    var pathings: Array<Chess.Coordinate[]> = [];

    var movePatterns = piece.movement.slice(0);
    var moves: Chess.Move[] = [];

    movePatterns.forEach(move => {
        var newPathings = getPaths(coordinate, move, piece.isWhite, bounds);
        var validPathings = newPathings.forEach(pathing => {
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
            var movePatternEvaluation = move.conditions.every(cond => cond(piece, board));
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
