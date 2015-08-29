var moveForward = {
    canMove: true,
    transforms: { file: 0, rank: 1 }
};
var firstMove = {
    canMove: true,
    transforms: { file: 0, rank: 2 },
    preCondition: function (piece, boardState) { return boardState.moveHistory.filter(function (m) { return m.piece.id === piece.id; }).length === 0; },
    postMoveAction: {
        action: function (piece, state, board) {
            var coordBehindPawn = piece.getRelativeDestination({ file: 0, rank: -1 });
            var squareBehindPawn = board.getSquare(coordBehindPawn, state);
            squareBehindPawn.tags["enpassant"] = true;
            // TODO: Add board postMoveFunction: Remove enpassant tag
        }
    }
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
    preCondition: enpassantPreMove({ file: -1, rank: 1 }),
    postMoveAction: {
        action: enpassantPostMove
    }
};
var rightEnpassant = {
    canCapture: true,
    transforms: { file: 1, rank: 1 },
    preCondition: enpassantPreMove({ file: 1, rank: 1 }),
    postMoveAction: {
        action: enpassantPostMove
    }
};
function enpassantPreMove(dir) {
    return function (piece, state, board) {
        var coord = piece.getRelativeDestination(dir);
        var sq = board.getSquare(coord, state);
        if (!sq)
            return false;
        return !!sq.tags["enpassant"];
    };
}
function enpassantPostMove(piece, state, board) {
    var coord = piece.getRelativeDestination({ file: 0, rank: -1 });
    var square = board.getSquare(coord, state);
    state.capturedPieces.push(square.piece);
    square.piece = null;
}
var pawn = {
    notation: "p",
    name: "Pawn",
    movement: [moveForward, firstMove, leftCapture, rightCapture, leftEnpassant, rightEnpassant],
    canQueen: true,
    canSpawn: false,
    value: 1
};
module.exports = pawn;
//# sourceMappingURL=pawn.js.map