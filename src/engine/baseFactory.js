var pieceRules = require("./rules/piece");
var BaseFactory = (function () {
    function BaseFactory(piece) {
        this.rules = pieceRules;
        this.piece = piece;
        this.notation = piece.notation;
    }
    BaseFactory.prototype.create = function (isWhite) {
        return {
            name: this.piece.name,
            movement: this.piece.movement,
            canQueen: this.piece.canQueen,
            canSpawn: this.piece.canSpawn,
            value: this.piece.value,
            isWhite: isWhite,
            notation: this.notation,
            moveHistory: []
        };
    };
    return BaseFactory;
})();
module.exports = BaseFactory;
//# sourceMappingURL=baseFactory.js.map