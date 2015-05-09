var fenStringParser = require("./stringParsers/fen");
var defaultPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
function fenParser(position) {
    var engine = this;
    var engineInput = fenStringParser.parse(position || defaultPosition);
    engine.whitesTurn = engineInput.turn === "w";
    var rankCount = this.rankCount;
    engineInput.ranks.forEach(function (rank) {
        engine.ranks[rankCount] = createFilesForRank(engine, rank, rankCount);
        rankCount--;
    });
}
function createFilesForRank(engine, fenRank, rankNumber) {
    var rank = {
        rank: rankNumber,
        squares: []
    };
    for (var i = 1; i <= engine.fileCount; i++) {
        var notation = fenRank[i - 1];
        var notationNumber = parseInt(notation);
        // If the notation is a number, that many squares from this square contain no piece.
        // TODO Consider refactoring--export to function for readability
        if (!isNaN(notationNumber)) {
            // Insert the next notation after the blank squares.
            if (!!fenRank[i + 1])
                fenRank[i + notationNumber] = fenRank[i + 1];
            // Insert blank squares from the current square, to currentSquare+notationNumber.
            for (var j = i; j < i + notationNumber; j++) {
                rank.squares[j] = { file: j, piece: null };
            }
            i += notationNumber - 1;
            continue;
        }
        var square = {
            file: i,
            piece: engine.createPiece(notation)
        };
        rank.squares[i] = square;
    }
    return rank;
}
module.exports = fenParser;
//# sourceMappingURL=fen.js.map