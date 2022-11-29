import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialFieldState } from './initial';
import { GameSettings } from '../game/types';
import { generateField, getSurroundingCells } from './generator';
import { startNewGame } from '../game/slice';
import { ICell } from './types';

export const fieldSlice = createSlice({
    name: 'field',
    initialState: initialFieldState,
    reducers: {
        generateField: (state, action: PayloadAction<GameSettings>) => {
            state.field = generateField(action.payload);
        },
        mark: (state, action: PayloadAction<ICell>) => {
            state.field[action.payload.y][action.payload.x].marked = !action.payload.marked;
        },
        uncover: (state, action: PayloadAction<ICell>) => {
            const uncoverCell = (y: number, x: number) => {
                state.field[y][x].uncovered = true;
                if (state.field[y][x].marked) state.field[y][x].marked = false;
                if (state.field[y][x].minesAround === 0 && !state.field[y][x].isMine) {
                    getSurroundingCells(state.field, y, x)
                        .filter((cell) => !cell.uncovered)
                        .forEach((cell) => uncoverCell(cell.y, cell.x));
                }
            };
            uncoverCell(action.payload.y, action.payload.x);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(startNewGame, (state, action) => {
            state.field = generateField(action.payload);
        });
    },
});

export const { mark, uncover } = fieldSlice.actions;

export default fieldSlice.reducer;
