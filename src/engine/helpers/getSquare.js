function getSquare(square, boardState) {
    if (!boardState.ranks[square.rank])
        return null;
    return boardState.ranks[square.rank].squares[square.file] || null;
}
module.exports = getSquare;
//# sourceMappingURL=getSquare.js.map