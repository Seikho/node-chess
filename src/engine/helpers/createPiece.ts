import Engine from '../index';
import BasePiece from '../basePiece';
import {
    Coordinate
} from '../../types';

export default function createPiece(this: Engine, notation: string, location: Coordinate): BasePiece {
    var matchingPiece = this.pieces.filter(p => p.notation === notation.toLocaleLowerCase());
    if (matchingPiece.length === 0) return null;

    var count = this.boardState.tags["pieceCount"] || 0;
    count++;
    this.boardState.tags["pieceCount"] = count;

    var newPiece = new this.pieceFactory(matchingPiece[0], notation);
    newPiece.id = count;

    newPiece.location = location;
    return newPiece;
}