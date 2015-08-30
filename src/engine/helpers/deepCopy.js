function deepCopy(boardState) {
    var copy = {
        ranks: boardState.ranks.map(copyRank),
        tags: shallowCopy(boardState.tags),
        moveNumber: boardState.moveNumber,
        whitesTurn: boardState.whitesTurn,
        capturedPieces: boardState.capturedPieces.slice(),
        preMoveFunctions: boardState.preMoveFunctions.slice(),
        postMoveFunctions: boardState.postMoveFunctions.slice(),
        moves: boardState.moves.slice(),
        moveHistory: boardState.moveHistory.slice(),
    };
    return copy;
}
function copyRank(rank) {
    var copy = {
        rank: rank.rank,
        squares: []
    };
    rank.squares.forEach(function (sq, i) {
        copy.squares[i] = {
            rank: sq.rank,
            file: sq.file,
            piece: copyPiece(sq.piece),
            tags: shallowCopy(sq.tags),
        };
    });
    return copy;
}
function shallowCopy(object) {
    var copy = {};
    if (!object)
        return copy;
    var keys = Object.keys(object);
    for (var x = 0; x < keys.length; x++) {
        var key = keys[x];
        copy[key] = object[key];
    }
    return copy;
}
function copyPiece(piece) {
    if (!piece)
        return null;
    var copy = shallowCopy(piece);
    copy.location = { rank: piece.location.rank, file: piece.location.file };
    copy.movement = piece.movement;
    copy.getRelativeDestination = piece.getRelativeDestination;
    copy.getAbsoluteDestination = piece.getAbsoluteDestination;
    copy.postMoveFunctions = piece.postMoveFunctions;
    return copy;
}
function copyAvailableMoves(moves) {
    function copyMove(move) {
        return {
            from: shallowCopy(move.from),
            to: shallowCopy(move.to),
            postMoveActions: shallowCopyArray(move.postMoveActions),
            isWhite: move.isWhite
        };
    }
    var newMoves = [];
    moves.forEach(function (m) { return newMoves.push(copyMove(m)); });
    return newMoves;
}
function copyMoveHistory(history) {
    function copyHistory(hist) {
        return {
            from: shallowCopy(hist.from),
            to: shallowCopy(hist.to),
            piece: hist.piece
        };
    }
    var newHistory = [];
    history.forEach(function (h) { return newHistory.push(copyHistory(h)); });
    return newHistory;
}
function shallowCopyArray(array) {
    return array ? array.slice() : [];
}
module.exports = deepCopy;
//# sourceMappingURL=deepCopy.js.map