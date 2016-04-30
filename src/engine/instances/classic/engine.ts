import Engine from '../../index';
import pawn from './pawn';
import knight from './knight';
import bishop from './bishop';
import rook from './rook';
import queen from './queen';
import king from './king';
import mates from './rules';

export default function classEngine(): Engine {
	var board = new Engine();
	
	board.pieces = [
		pawn, knight, bishop, rook, queen, king
	];

	board.positionParser();
	
	board.postMoveFunctions = [mates];
	
	return board;
}
