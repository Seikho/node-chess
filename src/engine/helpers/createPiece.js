function createPiece(notation, location) {
    var matchingPiece = this.pieces.filter(function (p) { return p.notation === notation.toLocaleLowerCase(); });
    if (matchingPiece.length === 0)
        return null;
    var newPiece = new this.pieceFactory(matchingPiece[0], notation);
    newPiece.location = location;
    return newPiece;
}
module.exports = createPiece;
//# sourceMappingURL=createPiece.js.map