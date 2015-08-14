var deepCopy = require("./deepCopy");
function movePiece(from, to, boardState) {
    var self = this;
    // TODO: Replace with better method
    // If no boardState is provided, the result of this function is stored as the calling engine's new board state 
    var saveToBoard = !boardState;
    boardState = deepCopy(boardState || self.boardState);
    var origin = self.getSquare(from, boardState);
    if (!origin || !origin.piece)
        return null;
    // Enforce turn-based movement
    if (boardState.whitesTurn !== origin.piece.isWhite)
        return null;
    // The 'destination' square must be in the square's list of available moves
    var move = boardState.moves.filter(function (m) {
        return m.from.file === from.file && m.from.rank === from.rank &&
            m.to.file === to.file && m.to.rank === to.rank;
    })[0];
    if (!move)
        return null;
    var destination = self.getSquare(to, boardState);
    if (destination.piece)
        boardState.capturedPieces.push(destination.piece);
    destination.piece = origin.piece;
    destination.piece.location = { file: to.file, rank: to.rank };
    destination.piece.moveHistory.push({ from: from, to: to, isWhite: origin.piece.isWhite });
    var movePatternPostActions = move.postMoveActions || [];
    movePatternPostActions.forEach(function (func) {
        func.action(destination.piece, boardState, self);
    });
    var pieceFunctions = destination.piece.postMoveFunctions || [];
    pieceFunctions.forEach(function (fn) { return fn.action(destination.piece, boardState, self); });
    origin.piece = null;
    boardState.whitesTurn = !boardState.whitesTurn;
    self.populateAvailableMoves(boardState);
    var enginePostMoveActions = boardState.postMoveFunctions || [];
    enginePostMoveActions.forEach(function (postMove) {
        if (!postMove.moveNumber || postMove.moveNumber === boardState.moveNumber)
            postMove.action(destination.piece, boardState, self);
    });
    boardState.moveNumber++;
    boardState.postMoveFunctions = enginePostMoveActions.filter(function (pmf) { return !pmf.moveNumber || pmf.moveNumber >= boardState.moveNumber; });
    if (saveToBoard) {
        // We only call post move functions if we're saving state
        self.postMoveFunctions.forEach(function (moveFn) {
            moveFn.action(destination.piece, boardState, self);
        });
        self.boardState = boardState;
    }
    return boardState;
}
module.exports = movePiece;
//# sourceMappingURL=movePiece.js.map