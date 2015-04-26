export enum Direction {
	Up, Down, Left, Right, DiagonalUp, DiagonalDown, Lateral, Horizontal, Vertical, Diagonal
}
/**
 * Defines a single move that a piece can perform
 */
export enum Turn {
	White = <any>"w",
	Black = <any>"b"
}

export enum Castling {
	WhiteKingSide = <any>"K",
	WhiteQueenSide = <any>"Q",
	BlackKingSide = <any>"k",
	BlackQueenSide = <any>"q"
}
