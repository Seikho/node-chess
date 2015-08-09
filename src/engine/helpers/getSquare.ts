import Chess = require("node-chess");
export = getSquare;

function getSquare(square: Chess.Coordinate, boardState: Chess.BoardState): Chess.Square {    
    if (!boardState.ranks[square.rank]) return null;
    return boardState.ranks[square.rank].squares[square.file] || null;
}