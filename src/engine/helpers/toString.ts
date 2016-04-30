import Engine from '../index';

export default function toString(this: Engine): string {
    var ranks: string[] = [];
    var fileLabels = ['-'];
    for (var i = this.rankCount;i > 0; i--) {
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
