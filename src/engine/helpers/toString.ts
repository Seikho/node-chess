import Engine from '../index';
import {BoardState} from "../../types";


export function boardToString(board: BoardState): string {
    let rankString: string[] = [];

    // Generate Axis X String
    let ranks: any = board.ranks[1]
    const fileIndices = ranks.squares.length - 1;
    let axisXNumbers = [...Array(fileIndices).keys()].map(i => `_${i+1}_`);
    rankString.push(['-',...axisXNumbers].join('|'))

    // Bottom to Top of Board
    board.ranks.forEach((rank, i) => {
        let s = '';

        // Generate Axis Y String
        s += `${i}|`

        const pieces: string[] = []

        // Left to right of board
        rank.squares.forEach(sq => {
            let p: string = sq.piece ? sq.piece.notation : '_'
            pieces.push(`_${p}_`)
        })

        s += pieces.join('|')

        rankString.push(s)
    })

    return rankString.reverse().join("\r\n");
}

export default function toString(this: Engine): string {
    var ranks: string[] = [];
    var fileLabels = ['-'];
    for (var i = this.rankCount; i > 0; i--) {
        fileLabels[i] = "_" + i + "_";
        var pieces: any[] = [i];
        var rank = this.boardState.ranks[i];
        for (var p in rank.squares) {
            var s = rank.squares[p];
            var val = s.piece == null?"_":s.piece.notation;
            if (s.piece) val = s.piece.isWhite?val.toUpperCase():val.toLowerCase();
            pieces.push("_" + val + "_");
        }
        ranks.push(pieces.join("|"));
    }
    ranks.push(fileLabels.join("|"));
    return ranks.join("\r\n");
}
