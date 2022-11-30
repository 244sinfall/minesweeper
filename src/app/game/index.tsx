import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startNewGame } from '../../store/game/slice';
import styled from 'styled-components';
import { FieldView } from '../../game/field-view';
import { GameProvider } from '../../game/provider';
import { updateField } from '../../store/field/slice';

const GameFieldCanvas = styled.canvas`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 0.1rem solid black;
    user-select: none;
`;

const getGameFieldSize = () => {
    if (window.innerWidth <= 750) return window.innerWidth;
    return Math.ceil(Math.min(window.innerHeight, window.innerWidth) * 0.7);
};

const GameField = () => {
    const state = useAppSelector((state) => ({
        settings: state.game.settings,
        field: state.field.field,
        ready: state.field.ready,
    }));
    const dispatch = useAppDispatch();
    // const playSound = useAudioPlayer();
    // useMediaPreloader([ExplosionGif], [DigSound, StickSound, WhooshSound, ExplosionSound]);
    const [fieldSize, setFieldSize] = useState(getGameFieldSize());
    const callbacks = {
        onResize: useCallback(() => setFieldSize(getGameFieldSize()), []),
    };
    const gameCanvas = useRef<HTMLCanvasElement | null>(null);
    const fieldRef = useRef<FieldView | null>(null);
    const gameRef = useRef(new GameProvider(state.field));
    useEffect(() => {
        if (state.ready) {
            gameRef.current.updateState(state.field);
        }
    }, [state.ready]);
    useEffect(() => {
        dispatch(startNewGame(state.settings));
        window.addEventListener('resize', callbacks.onResize);
        const unsub = gameRef.current.subscribe('export', (newState) => {
            if (newState) {
                dispatch(updateField(newState));
            }
        });
        return () => {
            window.removeEventListener('resize', callbacks.onResize);
            unsub();
        };
    }, []);
    useEffect(() => {
        if (gameCanvas.current) {
            fieldRef.current = new FieldView(gameRef.current, state.settings, gameCanvas.current, fieldSize);
        }
    }, [gameCanvas]);
    useEffect(() => {
        if (fieldRef.current) {
            fieldRef.current.frameSize = getGameFieldSize();
        }
    }, [fieldSize]);
    return <GameFieldCanvas ref={gameCanvas} width={fieldSize} height={fieldSize} />;
};

export default React.memo(GameField);
