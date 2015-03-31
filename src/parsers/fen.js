var PEG = require("pegjs");
var FenParser = (function () {
    function FenParser(board) {
        this.board = board;
    }
    FenParser.prototype.parse = function (position) {
        //TODO Implement fen string parser, return a board
        // Only accept 8x8 board?
        // This will split a FEN string into an array. First 8 indexes are ranks of the board, descending from rank 8 t rank 1.
        var info = position.match(/[a-z|A-Z|0-9]*[^/\s]/g);
        for (var i = 1; i <= this.board.rankCount; i++) {
            this.board.ranks[i] = this.createFilesForRank(info[i - 1], i);
        }
    };
    FenParser.prototype.createFilesForRank = function (fenRank, rankNumber) {
        var rank = {
            rank: rankNumber,
            squares: []
        };
        for (var i = 1; i <= this.board.fileCount; i++) {
            var notation = fenRank[i - 1];
            var notationNumber = parseInt(notation);
            // If the notation is a number, that many squares from this square contain no piece.
            // TODO Consider refactoring--export to function for readability
            if (!isNaN(notationNumber)) {
                // Insert the next notation after the blank squares. 
                if (!!fenRank[i + 1])
                    fenRank[i + notationNumber] = fenRank[i + 1];
                for (var j = i; j < i + notationNumber; j++)
                    rank.squares.push({ file: j, piece: null });
                i += notationNumber - 1;
                continue;
            }
            var square = {
                file: i,
                piece: this.getPiece(notation)
            };
            rank.squares[i] = square;
        }
        return rank;
    };
    FenParser.prototype.getPiece = function (notation) {
        var pieceFactory = this.board.pieces.filter(function (p) { return p.notation === notation.toString().toLowerCase(); });
        return pieceFactory.length === 0 ? null : pieceFactory[0].create(pieceFactory[0].notation.toLowerCase() !== notation);
    };
    return FenParser;
})();
var parser = PEG.buildParser("\n\tStart\n\t= r:RankList WS t:Turn WS c:Castling WS Enpassant WS h:HalfMove WS m:Move\n\t{ return { \n\tranks: r,\n\tturn: t,\n\tcastling: c,\n\thalfMove: h,\n\tfullMove: t };\n\t}\n\tRankList\n\t= head:Rank \"/\" tail:RankList { return [].concat(head,tail); }\n\t/ Rank\n\n\tRank\n\t= rank:[a-zA-Z0-9]+ { return rank.join(''); }\n\n\tWS\n\t= \" \"* { return null; }\n\n\tTurn\n\t= turn:[w|b] { return turn }\n\n\tCastling\n\t= [k|q|K|Q|\"-\"]+\n\n\tEnpassant\n\t= [a-h1-8]{1}\n\t/ \"-\"\n\n\tHalfMove\n\t= [0-9]+\n\n\tMove\n\t= [0-9]+\n");
module.exports = FenParser;
