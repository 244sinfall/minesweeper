import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startNewGame } from '../../store/game/slice';
import styled from 'styled-components';
import Cell from '../../components/cell';
import { FieldSize } from '../../store/game/types';

const GameFieldWrapper = styled.div<{ size: number }>`
    position: fixed;
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const FieldGrid = styled.div<{ fieldSize: FieldSize; cellSize: number }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.fieldSize.width}, ${(props) => props.cellSize}px);
    grid-template-rows: repeat(${(props) => props.fieldSize.height}, ${(props) => props.cellSize}px);
    justify-content: center;
`;

const GameField = () => {
    const settings = useAppSelector((state) => state.game.settings);
    const dispatch = useAppDispatch();
    const [fieldSize, setFieldSize] = useState(Math.ceil(Math.min(window.innerHeight, window.innerWidth) * 0.7));
    const onResize = useCallback(() => {
        setFieldSize(Math.ceil(Math.min(window.innerHeight, window.innerWidth) * 0.7));
    }, []);
    useEffect(() => {
        dispatch(startNewGame(settings));
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    const fieldCells = useAppSelector((state) => state.field.field);
    const fieldView = useMemo(() => {
        return fieldCells.map((fieldRow, rowIndex) =>
            fieldRow.map((cell, cellIndex) => <Cell key={rowIndex + cellIndex} {...cell} />),
        );
    }, [fieldCells]);
    return (
        <GameFieldWrapper size={fieldSize}>
            <FieldGrid
                fieldSize={settings.size}
                cellSize={fieldSize / Math.max(settings.size.width, settings.size.height)}
            >
                {fieldView}
            </FieldGrid>
        </GameFieldWrapper>
    );
};

export default React.memo(GameField);
