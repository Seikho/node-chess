function infer(piece, boardState) {
    var self = this;
    boardState = boardState || self.boardState;
}
function process(move, piece, boardState) {
    var modifier = piece.isWhite ? 1 : -1;
    var transformedCoords = [];
    var transforms = move.transforms;
    if (transforms instanceof Array) {
        for (var x = 0; x < transforms.length; x++) {
            transformedCoords.push(applyTransform(piece.location, transforms[x], modifier));
        }
    }
    else
        transformedCoords.push(piece.location, transforms, modifier);
}
function applyTransform(coordinate, transform, modifier) {
    var file = coordinate.file + (transform.file * modifier);
    var rank = coordinate.rank + (transform.rank * modifier);
    return {
        file: file, rank: rank
    };
}
//# sourceMappingURL=newInferMoves.js.map