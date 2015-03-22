# Node-chess
#### An extensible chess engine with position analysis, board analysis, and computer opposition.

### What does it do? How is it extensible?
Node-chess allows you extend the board and add your own rules. The analysis engine and computer player will automatically factor these changes/additions into their calculations and adjust accordingly. 

With node-chess you can:

- define your own pieces and modify existing pieces 
	- (re-)define their notation, movement, value, and capture logic
- add, change, and remove rules such as win and loss conditions
- extend the existing engine to improve the calculations for your own variants

