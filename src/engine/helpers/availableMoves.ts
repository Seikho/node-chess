import Engine from '../index';
import {
    BoardState,
    Move
} from '../../types';

export default function availableMoves(this: Engine, boardState?: BoardState) {
    boardState = boardState || this.boardState; 
    var moves: Move[] = [];
    
    boardState.ranks.forEach(rank => {
        rank.squares.forEach(square => {
            if (square.piece == null) return;
            moves = moves.concat(this.inferMoves(square.piece, boardState));
        });
    });
    
    boardState.moves = moves;
}