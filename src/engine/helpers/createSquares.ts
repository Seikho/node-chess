import Engine from '../index';
import { Rank } from '../../types';

export default function createSquares(this: Engine) {
    this.boardState.ranks = [];
    for (var rank = 0; rank < this.rankCount;rank++) {
        var row: Rank = {
            rank: rank,
            squares: []
        };

        for (var file = 0; file < this.fileCount;file++) {
            row.squares[file+1] = {
                rank: rank,
                file: file,
                piece: null,
                tags: []
            }
        }
        this.boardState.ranks[rank+1] = row;
    }
}
