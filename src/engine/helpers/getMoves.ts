import getPaths = require("./getPaths");
export = getMoves;

function getMoves(coordinate: Chess.Coordinate): Chess.Coordinate[] {
    var self: Chess.Engine = this;
    var square: Chess.Square = self.getSquare(coordinate);
    var piece = square.piece;
    var bounds = { file: this.fileCount, rank: this.rankCount };

    // No piece, no moves.
    if (!piece) return [];

    function isValidPath(path: Chess.Coordinate[], move: Chess.MovePattern): boolean {
        // TODO: Rules API would be used here
        var isWhite = !!piece.isWhite;

        // Optimisations
        var lastCoordinateIndex = path.length-1;
        var lastCoordinate = path[lastCoordinateIndex];
        var lastSquare = self.getSquare(lastCoordinate);

        // Destination occupied optimisations        
        if (!!lastSquare.piece) {
            
            // Can't land on your own piece
            if (!!isWhite === !!lastSquare.piece.isWhite) return false;
            
            // Must be able to capture if pieces are opposing colours
            if (!move.canCapture) return false;
        }
        
        // Destination unoccupied optimisations 
        else {
            if (!move.canMove) return false;
        }
        
        
        
        
        
        return true;
    }





    var pathings: Array<Chess.Coordinate[]> = [];
    piece.movement.forEach(move => {

        pathings = pathings.concat(getPaths(coordinate, move, piece.isWhite, bounds))
    });

    var moves = pathings.map(pathing => {
        return pathing[pathing.length - 1];
    });
    return moves;
}
