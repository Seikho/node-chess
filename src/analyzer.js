var Analyzer = (function () {
    function Analyzer(board, options) {
        this.options = {};
        this.evaluation = 0;
        if (!options)
            options = {};
        this.options.interval = options.interval || 100;
        this.options.depth = options.depth || 5;
        this.options.time = options.time || 5;
        this.startTime = Date.now();
    }
    Analyzer.prototype.calculate = function (callback) {
        //TODO 
        callback(this.evaluation);
    };
    return Analyzer;
})();
module.exports = Analyzer;
//# sourceMappingURL=analyzer.js.map