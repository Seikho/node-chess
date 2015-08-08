import Chess = require("node-chess");
export = availableMoves;

function availableMoves() {
    this.ranks.forEach(rank => {
        rank.squares.forEach(square => {
            square.availableMoves = this.availableMoves({ file: square.file, rank: rank.rank });
        });
    });
}