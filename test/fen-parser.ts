import Chess = require("../src/types");
import classicEngine = require("../src/engine/instances/classic");
import pieces = require("../src/engine/pieces/pieces");
import chai = require("chai");
var expect = chai.expect;

describe("fen parsing tests", () => {
	// Build a basic board with a pawn a valid piece
	var engine = classicEngine();

	// Initialise the board with the default string position
	engine.positionParser();

	it("will have a pawn at 7,2", () => {
		var rankEight = engine.ranks[7];
		var fileOne = rankEight.squares[2];
		expect(fileOne.piece).to.exist;
	});
});
