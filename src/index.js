var Engine = require("./engine/engine");
var classicEngine = require("./engine/instances/classic");
var classicPieces = require("./engine/pieces/pieces");
var enums = require("./enums");
var chess = Engine;
chess.classic = {
    engine: classicEngine,
    pieces: classicPieces
};
chess.Direction = enums.Direction;
module.exports = chess;
//# sourceMappingURL=index.js.map