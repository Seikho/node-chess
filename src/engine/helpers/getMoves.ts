import Chess = require("../../types");
import getIncrements = require("./getIncrements");
import addCoordinates = require("./addCoordinates");
import isInBounds = require("./isInBounds");
export = getMovesForPiece;

function getMovesForPiece(coordinate: Chess.Coordinate, piece: Chess.Piece): Chess.Coordinate[] {
	var coordinates: Chess.Coordinate[] = [];
	if (!piece) return [];
	piece.movement.forEach(move => coordinates = coordinates.concat(getMovesForMovePattern(coordinate, move, piece.isWhite)));
	return coordinates;
}

function getMovesForMovePattern(coordinate: Chess.Coordinate, movePattern: Chess.MovePattern, isWhite?: boolean, bounds?: Chess.Coordinate): Chess.Coordinate[] {
	isWhite = !!isWhite;
	bounds = bounds || { rank: 8, file: 8 };
	var coordinates: Chess.Coordinate[] = [];

	movePattern.moves.forEach(move => {
		var incrementers = getIncrements(move, coordinate, bounds, isWhite);
		coordinates = addCoordinates(coordinates, incrementers);
	});
	return addCoordinates([coordinate], coordinates).filter(coord => isInBounds(coord, bounds));
}
