function getSquare(square) {
    if (!this.ranks[square.rank])
        return null;
    return this.ranks[square.rank].squares[square.file] || null;
}
module.exports = getSquare;
//# sourceMappingURL=getSquare.js.map