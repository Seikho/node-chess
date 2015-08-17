import Pawn = require("./pawn");
import Rook = require("./rook");
import Knight = require("./knight");
import Bishop = require("./bishop");
import Queen = require("./queen")
import King = require("./king");
export = pieces;

var pieces = {
	pawn: Pawn,
	knight: Knight,
	bishop: Bishop,
	rook: Rook,
	queen: Queen,
	king: King
};