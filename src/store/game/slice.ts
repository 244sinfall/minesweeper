import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialGameState } from './initial';
import { GameSettings } from './types';

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialGameState,
    reducers: {
        startNewGame: (state, action: PayloadAction<GameSettings>) => {
            state.settings = action.payload;
        },
    },
});

export const { startNewGame } = gameSlice.actions;

export default gameSlice.reducer;
