import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game/slice';
import fieldReducer from './field/slice';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        field: fieldReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
