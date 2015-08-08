import Chess = require("node-chess");
export = createPiece;

function createPiece(notation: string, location: Chess.Coordinate): Chess.BasePiece {
    var matchingPiece = this.pieces.filter(p => p.notation === notation.toLocaleLowerCase());
    if (matchingPiece.length === 0) return null;
    var newPiece = new this.pieceFactory(matchingPiece[0], notation);
    newPiece.location = location;
    return newPiece;
}