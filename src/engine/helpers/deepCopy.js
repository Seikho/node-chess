function deepCopy(boardState) {
    var copy = {
        ranks: boardState.ranks.map(copyRank),
        tags: shallowCopy(boardState.tags),
        moveNumber: boardState.moveNumber,
        whitesTurn: boardState.whitesTurn,
        capturedPieces: boardState.capturedPieces.map(shallowCopy)
    };
    return copy;
}
function copyRank(rank) {
    var copy = {
        rank: rank.rank,
        squares: []
    };
    rank.squares.forEach(function (sq) {
        copy.squares.push({
            rank: sq.rank,
            file: sq.file,
            piece: shallowCopy(sq.piece),
            tags: shallowCopy(sq.tags),
            availableMoves: copyAvailableMoves(sq.availableMoves)
        });
    });
    return copy;
}
function shallowCopy(object) {
    var copy = {};
    var add = function (key) { return copy[key] = object[key]; };
    Object.keys(object)
        .forEach(add);
    return copy;
}
function copyAvailableMoves(moves) {
    function copyMove(move) {
        return {
            from: shallowCopy(move.from),
            to: shallowCopy(move.to),
            postMoveActions: move.postMoveActions ? move.postMoveActions.slice() : []
        };
    }
    return moves.map(copyMove);
}
module.exports = deepCopy;
//# sourceMappingURL=deepCopy.js.map