function isInBounds(coordinate, bounds) {
    return coordinate.rank <= bounds.rank && coordinate.file <= bounds.file && coordinate.rank > 0 && coordinate.file > 0;
}
module.exports = isInBounds;
//# sourceMappingURL=isInBounds.js.map