export = isInBounds;

function isInBounds(coordinate: Chess.Coordinate, bounds: Chess.Coordinate) {
    return coordinate.rank <= bounds.rank && coordinate.file <= bounds.file && coordinate.rank > 0 && coordinate.file > 0;
}
