import Chess = require("node-chess");
export = availableMoves;

function availableMoves() {
    var self: Chess.Engine = this;
    
    self.boardState.ranks.forEach(rank => {
        rank.squares.forEach(square => {
            square.availableMoves = self.availableMoves({ file: square.file, rank: rank.rank });
        });
    });
}