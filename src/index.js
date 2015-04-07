var classicBoard = require("./boards/classic");
setTimeout(createBoard, 20000);
function createBoard() {
    var board = classicBoard();
    var moves = console.log(board.availableMoves({ file: 2, rank: 1 }));
}
//# sourceMappingURL=index.js.map