import classicEngine = require("../src/engine/instances/newClassic/engine");
import chai = require("chai");
var expect = chai.expect;

describe("fen parsing tests", () => {
	// Build a basic board with a pawn a valid piece
	var engine = classicEngine();

	// Initialise the board with the default string position
	engine.positionParser();

	it("will have a pawn at 7,2", () => {
		var rankEight = engine.boardState.ranks[7];
		var fileOne = rankEight.squares[2];
		expect(fileOne.piece).to.exist;
	});
});
