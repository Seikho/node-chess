function movePiece(from, to) {
    var _this = this;
    var origin = this.getSquare(from);
    if (!origin || !origin.piece)
        return false;
    // Enforce turn-based movement
    if (this.whitesTurn !== origin.piece.isWhite)
        return false;
    // The 'destination' square must be in the square's list of available moves
    if (!origin.availableMoves.some(function (availableMove) { return availableMove.file === to.file && availableMove.rank === to.rank; }))
        return false;
    var destination = this.getSquare(to);
    if (destination.piece)
        this.capturedPieces.push(destination.piece);
    destination.piece = origin.piece;
    destination.piece.location = { file: to.file, rank: to.rank };
    destination.availableMoves = [];
    destination.piece.moveHistory.push({ from: from, to: to });
    var pieceFunctions = destination.piece.postMoveFunctions;
    if (pieceFunctions.length > 0) {
        pieceFunctions.forEach(function (fn) { return fn.action(destination.piece, _this); });
    }
    origin.piece = null;
    origin.availableMoves = [];
    this.whitesTurn = !this.whitesTurn;
    this.populateAvailableMoves();
    var postMoveFunctions = this.postMoveFunctions;
    if (postMoveFunctions.length > 0) {
        postMoveFunctions.forEach(function (postMove) {
            if (!postMove.moveNumber || postMove.moveNumber === _this.moveNumber)
                postMove.action(destination.piece, _this);
        });
    }
    this.moveNumber++;
    this.postMoveFunctions = postMoveFunctions.filter(function (pmf) { return pmf.moveNumber >= _this.moveNumber; });
    return true;
}
module.exports = movePiece;
//# sourceMappingURL=movePiece.js.map