import Chess = require("node-chess");
export = availableMoves;

function availableMoves(boardState?: Chess.BoardState) {
    var self: Chess.Engine = this;
    boardState = boardState || self.boardState; 
    var moves: Chess.Move[] = [];
    
    boardState.ranks.forEach(rank => {
        rank.squares.forEach(square => {
            if (square.piece == null) return;
            moves = moves.concat(self.inferMoves({file: square.file, rank: rank.rank }, boardState));
        });
    });
    
    boardState.moves = moves;
}