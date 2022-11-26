import React from 'react';
import { useAppSelector } from './store/hooks';
import GameField from './app/game';
import './app.css';

const App = () => {
    const status = useAppSelector((state) => state.game.status);
    switch (status) {
        case 'playing':
            return <GameField />;
    }
};

export default App;
