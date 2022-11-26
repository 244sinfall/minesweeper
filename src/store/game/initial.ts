import { GameState } from './types';

export const initialGameState: GameState = {
    settings: {
        size: {
            width: 7,
            height: 7,
        },
        mines: 10,
    },
    status: 'playing',
};
