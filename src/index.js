var classicEngine = require("./engine/instances/classic");
function createEngine() {
    var board = classicEngine();
    console.log(board.toString());
    var moves = console.log(board.availableMoves({ file: 2, rank: 1 }));
}
createEngine();
//# sourceMappingURL=index.js.map