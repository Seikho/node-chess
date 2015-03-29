import Pawn = require("./pawn");
import Rook = require("./rook");
import Knight = require("./knight");
import Bishop = require("./bishop");
export = pieces;

var pieces = {
	pawn: Pawn,
	knight: Knight,
	bishop: Bishop,
	rook: Rook
};