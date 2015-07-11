var Engine = require("./engine/engine");
var classicEngine = require("./engine/instances/classic");
var classicPieces = require("./engine/pieces/pieces");
var enums = require("./enums");
var Direction = enums.Direction;
module.exports = {
    Engine: Engine,
    engines: {
        classic: {
            engine: classicEngine,
            pieces: classicPieces
        }
    },
    Direction: Direction
};
//# sourceMappingURL=index.js.map