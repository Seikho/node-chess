import Engine from '../index';
import {
    Coordinate,
    BoardState,
    Square
} from '../../types';

export default function getSquare(this: Engine, square: Coordinate, boardState?: BoardState): Square {
    boardState = boardState || this.boardState; 
        
    if (!boardState.ranks[square.rank]) return null;
    return boardState.ranks[square.rank].squares[square.file] || null;
}