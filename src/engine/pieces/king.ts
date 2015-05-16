export = king;

var diag = {
	moves: [{ direction: Chess.Direction.Diagonal, count: 1 }],
	canJump: false,
	canMove: true,
	canCapture: true
}

var lat = {
	moves: [{ direction: Chess.Direction.Lateral, count: 1 }],
	canJump: false,
	canMove: true,
	canCapture: true
}

var king = {
	name: "King",
	movement: [diag, lat],
	canQueen: false,
	canSpawn: false,
	value: 10,
	notation: "k"
}