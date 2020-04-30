import Engine from '../index';
import {Rank} from '../../types';

/**
 * Init board size
 */
export default function createSquares(this: Engine) {
    this.boardState.ranks = [];


    for (let rank = 0; rank < this.rankCount; rank++) {

        const row: Rank = {
            rank: rank,
            squares: []
        };

        for (let file = 0; file < this.fileCount; file++) {
            row.squares[file + 1] = {
                rank: rank,
                file: file,
                piece: null,
                tags: {}
            }
        }
        this.boardState.ranks[rank + 1] = row;
    }
}
