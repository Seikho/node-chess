var Engine = require("./engine/engine");
var classicEngine = require("./engine/instances/classic");
var classicPieces = require("./engine/pieces/pieces");
var enums = require("./enums");
var chess = {
    engine: Engine,
    classic: {
        engine: classicEngine,
        pieces: classicPieces,
    },
    Direction: enums.Direction
};
module.exports = chess;
//# sourceMappingURL=index.js.map