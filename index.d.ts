import Engine from './src/engine';
import {Direction} from './src/enums';

export {
    BoardState,
    BoardTag,
    MoveFunction,
    Coordinate,
    Rank,
    Square,
    Move,
    MoveHistory,
    BoardPiece,
    MoveDefinition,
    Increment,
    Transform,
    MoveCondition,
    SingleMove,
    AnalysisOptions,
    PositionParser,
    StringParser,
    BoardInput,
    Rule
} from './src/types'

declare var api: {
    Direction: typeof Direction,
    Engine: typeof Engine,
    classic: {
        engine: () => Engine
    }
}

export default api;

/**
 * TODO: Fix!
 * Export
 */
