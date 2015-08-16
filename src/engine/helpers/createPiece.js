function createPiece(notation, location) {
    var self = this;
    var matchingPiece = self.pieces.filter(function (p) { return p.notation === notation.toLocaleLowerCase(); });
    if (matchingPiece.length === 0)
        return null;
    var count = self.boardState.tags["pieceCount"] || 0;
    count++;
    self.boardState.tags["pieceCount"] = count;
    var newPiece = new this.pieceFactory(matchingPiece[0], notation);
    newPiece.id = count;
    newPiece.location = location;
    return newPiece;
}
module.exports = createPiece;
//# sourceMappingURL=createPiece.js.map