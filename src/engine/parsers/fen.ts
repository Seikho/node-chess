import Engine from '../index';
import {
	Rank
} from '../../types';
import fenStringParser from './stringParsers/fen';

const defaultPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

/**
 * Parses fen string and sets engine state accordingly
 * @param position - the fen string
 */
export default function fenParser(this: Engine, position?: string): void {

	var engineInput = fenStringParser.parse(position || defaultPosition);

	this.boardState.whitesTurn = engineInput.turn === "w";
	var rankCount = this.rankCount;
	engineInput.ranks.forEach(rank => {
		this.boardState.ranks[rankCount] = createFilesForRank(this, rank, rankCount);
		rankCount--;
	});

	this.populateAvailableMoves();
}

function createFilesForRank(engine: Engine, fenRank: string, rankNumber: number): Rank {
	var rank: Rank = {
		rank: rankNumber,
		squares: []
	}
	const fenRankArray = fenRank.split('');

	var lastNotationNumber = 0;
	var index = 0;
	for (var i = 1; i <= engine.fileCount; i++) {
		var notation = fenRankArray[index];
		var notationNumber = parseInt(notation);

		// If the notation is a number, that many squares from this square contain no piece.
		// TODO Consider refactoring--export to function for readability
		if (!isNaN(notationNumber)) {
			lastNotationNumber += notationNumber;
			// Insert the next notation after the blank squares.
			if (!!fenRankArray[i + 1]) fenRankArray[i + notationNumber] = fenRankArray[i + 1];

			// Insert blank squares from the current square, to currentSquare+notationNumber.
			for (var j = i; j < i + notationNumber; j++) {
				rank.squares[j] = { rank: rankNumber, file: j, piece: null, tags: {} };
			}
			i += notationNumber - 1;
			index++;
			continue;
		}
		rank.squares[i] = {
			rank: rankNumber,
			file: i,
			piece: engine.createPiece(notation, { file: i, rank: rankNumber }),
			tags: {}
		};
		index++;
	}
	return rank;
}
