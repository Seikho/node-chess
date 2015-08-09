import Chess = require("node-chess");
export = availableMoves;

function availableMoves(boardState: Chess.BoardState) {
    var self: Chess.Engine = this;
    
    boardState.ranks.forEach(rank => {
        rank.squares.forEach(square => {
            square.availableMoves = self.availableMoves({ file: square.file, rank: rank.rank });
        });
    });
}