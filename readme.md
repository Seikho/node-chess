# Node-chess
A fully isomorphic and extensible chess engine with position analysis, board analysis, and computer opposition.

[![NPM version](http://img.shields.io/npm/v/node-chess.svg?style=flat)](https://www.npmjs.org/package/node-chess)
[![Travis build status](http://img.shields.io/travis/Seikho/node-chess/master.svg?style=flat)](https://travis-ci.org/Seikho/node-chess)

### Under construction !!!

### What does it do? How is it extensible?
Node-chess allows you extend the board and add your own rules. The analysis engine and computer player will automatically factor these changes/additions into their calculations and adjust accordingly. 

With node-chess you can:

- define your own pieces and modify existing pieces 
	- (re-)define their notation, movement, value, and capture logic
- add, change, and remove rules such as win and loss conditions
- extend the existing engine to improve the calculations for your own variants

### Installation
Add it as a dependency to your project
```javascript
npm install node-chess
```

In the browser
```html
<script src="node-chess.js">
	var game = chess.classic.engine();
</script>
```

The engine comes with a 'classic' implementation of Chess.
```javascript
var chess = require("node-chess");
var game = chess.classic.engine();
``` 

### Using the board
```javascript
// Move the E2 pawn to E4
game.movePiece( { from: { file: 5, rank: 2 } , to: { file: 5, rank: 4 } });

// Move the B8 knight to C6 
game.movePiece( { from: { file: 2, rank: 8 }, to: { file: 3, rank: 6 } });

// Try and make an invalid move
// No piece is on B8
game.movePiece({ from: { file: 2, rank: 8 }, to: { file: 3, rank: 6 } }); === null; // true

// Promotion
// To a queen (by default)
game.movePiece({ from: { file: 1, rank: 7 }, to: { file: 1, rank: 8 } });

// To a rook
game.movePiece({ from: { file: 1, rank: 7 }, to: { file: 1, rank: 8 } }, "r");

// Print the available moves of the C6 knight to the console
console.log(classicEngine.getMoves({ file: 3, rank: 6 }));
```

### Defining your own pieces
The 'super knight' moves 3 squares laterally before moving 1 square on the opposite axis!

```javascript
var Direction = require("./engine/direction");
var customEngine = new chess.Engine();

var upLeft = makeMove(-1, 3);
var upRight = makeMove(1, 3);

var downLeft = makeMove(-1, -3);
var downRight = makeMove(1, -3);

var leftUp = makeMove(-3, 1);
var leftDown = makeMove(-3, -1);

var rightUp = makeMove(3, 1);
var rightDown = makeMove(3, -1);

function makeMove(file, rank) {
	return {
		canCapture: true,
		canMove: true,
		transforms: { file: file, rank: rank, canJump: true }
	}
}

var superKnight = {
	name: "SuperKnight",
	movement: [upLeft, upRight, downLeft, downRight, leftUp, leftDown, rightUp, rightDown],
	canQueen: false,
	canSpawn: true,
	value: 3.5,
	notation: "s"
}

customEngine.pieces.push(superKnight);
```

[![Analytics](https://ga-beacon.appspot.com/UA-61186849-1/seikho/node-chess)](https://github.com/Seikho/watcher)

[![Build Status](https://semaphoreci.com/api/v1/projects/0b754a96-b327-48da-8b40-9c9985086c31/386310/badge.svg)](https://semaphoreci.com/seikho/node-chess)
