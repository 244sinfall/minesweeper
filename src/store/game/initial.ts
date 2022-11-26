import { GameState } from './types';

export const initialGameState: GameState = {
    settings: {
        size: {
            width: 20,
            height: 20,
        },
        mines: 10,
    },
    status: 'playing',
};
