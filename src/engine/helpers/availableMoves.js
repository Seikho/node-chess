function availableMoves(boardState) {
    var self = this;
    boardState = boardState || self.boardState;
    var moves = [];
    boardState.ranks.forEach(function (rank) {
        rank.squares.forEach(function (square) {
            if (square.piece == null)
                return;
            moves = moves.concat(self.inferMoves(square.piece, boardState));
        });
    });
    boardState.moves = moves;
}
module.exports = availableMoves;
//# sourceMappingURL=availableMoves.js.map