var Engine = require("./engine/engine");
var classicEngine = require("./engine/instances/classic");
var classicPieces = require("./engine/pieces/pieces");
var enums = require("./enums");
var Directions = enums.Direction;
exports.engine = Engine;
exports.classic = {
    engine: classicEngine,
    pieces: classicPieces
};
exports.Direction = Directions;
//# sourceMappingURL=index.js.map