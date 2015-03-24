/// <reference path="../typings/internal.d.ts" />
import Chess = require("../types");
class FenParser implements Chess.PositionParser {
	constructor(){}

	parse(position: string): any {
		//TODO Implement fen string parser, return a board
		// Only accept 8x8 board?
		return null;
	}
}
