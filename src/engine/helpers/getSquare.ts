import Chess = require("node-chess");
export = getSquare;

function getSquare(square: Chess.Coordinate): Chess.Square {
    if (!this.ranks[square.rank]) return null;
    return this.ranks[square.rank].squares[square.file] || null;
}