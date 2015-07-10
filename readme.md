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
// In your project
var chess = require("node-chess");
```

The engine comes with a 'classic' implementation of Chess.
```javascript
var classicEngine = chess.classicEngine();
``` 

###Using the board
```javascript
var classicEngine = chess.classicEngine();
// Move the E2 pawn to E4
classicEngine.movePiece({ file: 5, rank: 2 } /* from */,{ file: 5, rank: 4 } /* to */);

// Move the B8 knight to C6 
classicEngine.movePiece({ file: 2, rank: 8 }, { file: 3, rank: 6 });

// Print the available moves of the C6 knight to the console
console.log(classicEngine.getSquare({ file: 3, rank: 6 }).availableMoves);
```

### Defining your own pieces
The 'super knight' moves 3 squares laterally before moving 1 square on the opposite axis!

```javascript
var Direction = require("./engine/direction");
var customEngine = new chess.Engine();
var horzThenVert = {
	moves: [{direction: Direction.Horizontal, count: 3}, {direction: Direction.Vertical, count: 1}],
	canJump: true,
	canCapture: true,
	canMove: true
}

var vertThenHorz = {
	moves: [{direction: Direction.Vertical, count: 3}, {direction: Direction.Horizontal, count: 1}],
	canJump: true,
	canCapture: true,
	canMove: true
} 

var superKnight = {
	name: "SuperKnight",
	movement: [horzThenVert, vertThenHorz],
	canQueen: false,
	canSpawn: true,
	value: 3,
	notation: "s"
}

customEngine.pieces.push(superKnight);
```

[![Analytics](https://ga-beacon.appspot.com/UA-61186849-1/seikho/node-chess)](https://github.com/Seikho/watcher)

[![Build Status](https://semaphoreci.com/api/v1/projects/0b754a96-b327-48da-8b40-9c9985086c31/386310/badge.svg)](https://semaphoreci.com/seikho/node-chess)
