import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialFieldState } from './initial';
import { generateField } from './generator';
import { startNewGame } from '../game/slice';
import { Field } from './types';

export const fieldSlice = createSlice({
    name: 'field',
    initialState: initialFieldState,
    reducers: {
        updateField: (state, action: PayloadAction<Field>) => {
            state.field = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(startNewGame, (state, action) => {
            state.field = generateField(action.payload);
            state.ready = true;
        });
    },
});

export const { updateField } = fieldSlice.actions;

export default fieldSlice.reducer;
