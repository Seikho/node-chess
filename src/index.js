var Engine = require("./engine/engine");
var classicEngine = require("./engine/instances/newClassic/engine");
var enums = require("./enums");
var chess = {
    Engine: Engine,
    classic: {
        engine: classicEngine,
    },
    Direction: enums.Direction
};
module.exports = chess;
//# sourceMappingURL=index.js.map