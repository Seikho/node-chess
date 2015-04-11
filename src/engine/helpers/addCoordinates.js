function addCoordinates(left, right, bounds) {
    // Return N | N*M -- whichever is greater
    if (left.length === 0)
        return right;
    if (right.length === 0)
        return left;
    var result = [];
    left.forEach(function (leftCoord) {
        right.forEach(function (rightCoord) {
            result.push({ file: leftCoord.file + rightCoord.file, rank: leftCoord.rank + rightCoord.rank });
        });
    });
    return result;
}
module.exports = addCoordinates;
//# sourceMappingURL=addCoordinates.js.map