export = {
    hasMoved: hasMoved
};

function hasMoved() {
    return this.moveHistory.length > 0;
}
