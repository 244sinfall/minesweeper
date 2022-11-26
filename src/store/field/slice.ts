import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialFieldState } from './initial';
import { GameSettings } from '../game/types';
import { generateField } from './generator';
import { startNewGame } from '../game/slice';

export const fieldSlice = createSlice({
    name: 'field',
    initialState: initialFieldState,
    reducers: {
        generateField: (state, action: PayloadAction<GameSettings>) => {
            state.field = generateField(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(startNewGame, (state, action) => {
            state.field = generateField(action.payload);
        });
    },
});

export default fieldSlice.reducer;
