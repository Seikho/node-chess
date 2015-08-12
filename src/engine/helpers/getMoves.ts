import Chess = require("node-chess");
import getPaths = require("./getPaths");
import isValidPath = require("./isValidPath")
export = getMoves;

// TODO: Desperately requires refactoring
function getMoves(coordinate: Chess.Coordinate, boardState?: Chess.BoardState): Chess.Move[] {
    var self: Chess.Engine = this;
    boardState = boardState || self.boardState;
    
    var square: Chess.Square = self.getSquare(coordinate, boardState);

    // No piece, no moves.
    var piece = square.piece;
    if (!piece) return [];
    
    // We want all moves available on the entire board for calculation purposes
    // Therefore we leave this commented out
    // var isMoveablePiece = piece.isWhite === board.whitesTurn;
    //if (!isMoveablePiece) return [];

    var bounds = { file: self.fileCount, rank: self.rankCount };

    var pathings: Array<Chess.Coordinate[]> = [];

    var movePatterns = piece.movement.slice(0);
    var moves: Chess.Move[] = [];

    movePatterns.forEach(move => {
        var newPathings = getPaths(coordinate, move, piece.isWhite, bounds);
        var validPathings = newPathings.forEach(pathing => {
            // If it's a vanilla move pattern, use the standard path validation strategy
            if (!move.conditions) {
                if (isValidPath(self, boardState, piece, pathing, move)) {
                    moves.push({
                        from: coordinate,
                        to: pathing[pathing.length - 1],
                        postMoveActions: [],
                        isWhite: piece.isWhite
                    });
                }
                return;
            }
            // Otherwise we use the logic provided with the move pattern
            var defaultValidPath = !!move.useDefaultConditions ? isValidPath(self, boardState, piece, pathing, move) : true;
            var movePatternEvaluation = move.conditions.every(cond => cond(piece, boardState, self));
            if (defaultValidPath && movePatternEvaluation) {
                moves.push({
                    from: coordinate,
                    to: pathing[pathing.length - 1],
                    postMoveActions: move.postMoveActions || [],
                    isWhite: piece.isWhite
                });
            }
        });
    });

    return moves;
}
