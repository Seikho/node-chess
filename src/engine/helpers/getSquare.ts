import Engine from '../index';
import {
    Coordinate,
    BoardState,
    Square
} from '../../types';

/**
 * Returns the square for the given coordinate, null if not found (index out of range perhaps?)
 * @param coordinate
 * @param boardState
 */
export default function getSquare(this: Engine, coordinate: Coordinate, boardState?: BoardState): Square {
    boardState = boardState || this.boardState;

    if (!boardState.ranks[coordinate.rank]) throw Error(`unable to get square for ${coordinate.rank} ${coordinate.file}`);

    return boardState.ranks[coordinate.rank].squares[coordinate.file];
}
