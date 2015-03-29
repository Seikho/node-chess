var Pawn = require("./pawn");
var Rook = require("./rook");
var Knight = require("./knight");
var Bishop = require("./bishop");
var Queen = require("./queen");
var King = require("./king");
var pieces = {
    pawn: Pawn,
    knight: Knight,
    bishop: Bishop,
    rook: Rook,
    queen: Queen,
    king: King
};
module.exports = pieces;
