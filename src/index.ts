import Engine from './engine';
import classicEngine from './engine/instances/classic/engine';
import {Direction} from './enums';

const chess = {
	Direction,
	Engine: Engine,
	classic: {
		engine: classicEngine,
	}
};

export default chess;
