function applyTransform(coordinate, transform) {
    return { file: coordinate.file + transform.file, rank: coordinate.rank + transform.rank };
}
module.exports = applyTransform;
//# sourceMappingURL=applyTransform.js.map