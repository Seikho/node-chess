import getIncrements = require("./getIncrements");
import addCoordinates = require("./addCoordinates");
import isInBounds = require("./isInBounds");
import getTransforms = require("./getTransforms");
import getPaths = require("./getPaths");
export = getMoves;

function getMoves(coordinate: Chess.Coordinate): Chess.Coordinate[] {
    var square = this.getSquare(coordinate);
    var piece = square.piece;
    var bounds = { file: this.fileCount, rank: this.rankCount };

    // No piece, no moves.
    if (!piece) return [];

    var pathings: Array<Chess.Coordinate[]> = [];
    piece.movement.forEach(move => pathings = pathings.concat(getPaths(coordinate, move, piece.isWhite, bounds)));
    var moves = pathings.map(pathing => {
        return pathing[pathing.length - 1];
    });
    return moves;
}

// TODO: Implement path validation -- Can a piece move to the end square using this path?
function isValidPath(path: Chess.Coordinate[], piece: Chess.Piece, getSquare: (coordinate: Chess.Coordinate) => Chess.Square): boolean {
    return true;
}
