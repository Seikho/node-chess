import Chess = require("node-chess");
export = getSquare;

function getSquare(square: Chess.Coordinate, boardState?: Chess.BoardState): Chess.Square {
    var self: Chess.Engine = this;
    boardState = boardState || self.boardState; 
        
    if (!boardState.ranks[square.rank]) return null;
    return boardState.ranks[square.rank].squares[square.file] || null;
}