var Chess = require("node-chess");
var Dir = Chess.Direction;
var moveForward = {
    canMove: true,
    transforms: { file: 0, rank: 1 }
};
var firstMove = {
    canMove: true,
    transforms: { file: 0, rank: 2 },
    preCondition: function (piece, boardState) { return boardState.moveHistory.filter(function (m) { return m.piece.id === piece.id; }).length === 0; }
};
var leftCapture = {
    canCapture: true,
    transforms: { file: 1, rank: 1 }
};
var rightCapture = {
    canCapture: true,
    transforms: { file: -1, rank: 1 }
};
var leftEnpassant = {
    canCapture: true,
    transforms: { file: -1, rank: 1 },
    preCondition: enpassantPreMove(Dir.UpLeft),
    postMoveAction: {
        action: enpassantPostMove(Dir.Left)
    }
};
var rightEnpassant = {
    canCapture: true,
    transforms: { file: 1, rank: 1 },
    preCondition: enpassantPreMove(Dir.UpRight),
    postMoveAction: {
        action: enpassantPostMove(Dir.Right)
    }
};
function enpassantPreMove(dir) {
    return function (piece, state, board) {
        var coord = piece.getRelativeDestinations(dir, 1);
        var sq = board.getSquare(coord[0], state);
        if (!sq)
            return false;
        return !!sq.tags["enpassant"];
    };
}
function enpassantPostMove(dir) {
    return function (piece, state, board) {
        var coord = piece.getRelativeDestinations(dir, 1);
        var square = board.getSquare(coord[0], state);
        state.capturedPieces.push(square.piece);
        square.piece = null;
    };
}
//# sourceMappingURL=pawn.js.map