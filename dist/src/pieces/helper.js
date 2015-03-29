function createMove(moves, canMove, canJump, canCapture) {
    return {
        moves: moves,
        canJump: !!canJump,
        canMove: !!canMove,
        canCapture: !!canCapture
    };
}
exports.createMove = createMove;
