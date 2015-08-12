import Chess = require("node-chess");
export = availableMoves;

function availableMoves(boardState: Chess.BoardState) {
    var self: Chess.Engine = this;
    var moves: Chess.Move[] = [];
    boardState.ranks.forEach(rank => {
        rank.squares.forEach(square => {
            moves = moves.concat(self.availableMoves({file: square.file, rank: rank.rank }, boardState));
        });
    });
    
    boardState.moves = moves;
}