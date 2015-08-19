import Chess = require("node-chess");
import getPaths = require("./getPaths");
import validatePath = require("./isValidPath")
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

    var pathings: Array<Chess.Coordinate[]> = [];

    var movePatterns = piece.movement;
    var moves: Chess.Move[] = [];

    // var newPathings = getPaths(coordinate, move, piece.isWhite);
    var validPathings = piece.transformCache.forEach(pathing => {
        var pathMoves = pathing.moves;
        var move = pathing.pattern;
        
        // If it's a vanilla move pattern, use the standard path validation strategy
        if (!move.conditions) {
            let validPath = validatePath(self, boardState, piece, pathMoves, move);
            if (validPath) {
                moves.push({
                    from: coordinate,
                    to: validPath[validPath.length - 1],
                    postMoveActions: move.postMoveActions || [],
                    isWhite: piece.isWhite
                });
            }
            return;
        }
        // Otherwise we use the logic provided with the move pattern
        let validPath = !!move.useDefaultConditions ? validatePath(self, boardState, piece, pathMoves, move) : null;
        if (!validPath) return; 
        
        var movePatternEvaluation = move.conditions.every(cond => cond(piece, boardState, self));
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