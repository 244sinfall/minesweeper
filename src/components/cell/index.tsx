import React, { useMemo } from 'react';
import { Cell } from '../../store/field/types';
import styled from 'styled-components';
import UncoveredCell from '../../assets/uncovered_cell.png';

const Wrapper = styled.div`
    max-width: 128px;
    max-height: 128px;
    user-select: none;
`;

const CellImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
`;

const Cell = (cell: Cell) => {
    const alt = useMemo(() => {
        if (!cell.uncovered) {
            if (cell.marked) {
                return 'Нераскрытая ячейка';
            } else {
                return 'Отмеченная ячейка';
            }
        } else {
            if (cell.isMine) return 'Мина!';
            return `Возле ячейки ${cell.minesAround} мин`;
        }
    }, [cell]);
    return (
        <Wrapper onClick={() => console.log(cell)}>
            <CellImg src={UncoveredCell} alt={alt} />
        </Wrapper>
    );
};

export default React.memo(Cell);
