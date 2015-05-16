export = queen;

var diag = {
	moves: [{ direction: Chess.Direction.Diagonal, count: 0 }],
	canJump: false,
	canMove: true,
	canCapture: true
}

var lat = {
	moves: [{ direction: Chess.Direction.Lateral, count: 0 }],
	canJump: false,
	canCapture: true,
	canMove: true
}

var queen = {
	name: "Queen",
	movement: [diag, lat],
	canQueen: false,
	canSpawn: true,
	value: 9,
	notation: "q"
}

