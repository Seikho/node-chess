import classicEngine from '../src/engine/instances/classic/engine';
import {expect} from 'chai';

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
