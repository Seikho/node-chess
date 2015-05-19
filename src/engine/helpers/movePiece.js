function movePiece(from, to) {
    var self = this;
    var origin = self.getSquare(from);
    if (!origin || !origin.piece)
        return false;
    // Enforce turn-based movement
    if (self.whitesTurn !== origin.piece.isWhite)
        return false;
    // The 'destination' square must be in the square's list of available moves
    var moveMatches = origin.availableMoves.filter(function (m) { return m.to.file === to.file && m.to.rank === to.rank; });
    if (moveMatches.length === 0)
        return false;
    var move = moveMatches[0];
    var destination = self.getSquare(to);
    if (destination.piece)
        self.capturedPieces.push(destination.piece);
    destination.piece = origin.piece;
    destination.piece.location = { file: to.file, rank: to.rank };
    destination.availableMoves = [];
    destination.piece.moveHistory.push({ from: from, to: to });
    var movePatternPostActions = move.postMoveActions || [];
    movePatternPostActions.forEach(function (func) {
        func.action(destination.piece, self);
    });
    var pieceFunctions = destination.piece.postMoveFunctions || [];
    pieceFunctions.forEach(function (fn) { return fn.action(destination.piece, self); });
    origin.piece = null;
    origin.availableMoves = [];
    self.whitesTurn = !self.whitesTurn;
    self.populateAvailableMoves();
    var enginePostMoveActions = self.postMoveActions || [];
    enginePostMoveActions.forEach(function (postMove) {
        if (!postMove.moveNumber || postMove.moveNumber === self.moveNumber)
            postMove.action(destination.piece, self);
    });
    self.moveNumber++;
    self.postMoveActions = enginePostMoveActions.filter(function (pmf) { return pmf.moveNumber >= self.moveNumber; });
    return true;
}
module.exports = movePiece;
//# sourceMappingURL=movePiece.js.map