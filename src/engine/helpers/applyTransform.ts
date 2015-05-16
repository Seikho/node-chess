export = applyTransform;
function applyTransform(coordinate: Chess.Coordinate, transform: Chess.Coordinate): Chess.Coordinate {
	return { file: coordinate.file + transform.file, rank: coordinate.rank + transform.rank }
}