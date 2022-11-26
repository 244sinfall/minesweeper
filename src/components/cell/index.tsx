import React, { useCallback, useMemo } from 'react';
import { Cell } from '../../store/field/types';
import styled from 'styled-components';
import CoveredCell from '../../assets/covered_cell.png';
import { useAppDispatch } from '../../store/hooks';
import { mark, uncover } from '../../store/field/slice';
import { CellImg } from '../common/cell-img';
import UncoveredCell from '../uncovered-cell';
import MarkedCell from '../marked-cell';

const Wrapper = styled.div`
    position: relative;
    user-select: none;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0) scale(1, 1);
`;

const Cell = (cell: Cell) => {
    const dispatch = useAppDispatch();
    const callbacks = {
        onClick: useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                if (e.button === 0 && !cell.uncovered) {
                    // ЛКМ
                    dispatch(uncover(cell));
                } else if (e.button === 2 && !cell.uncovered) {
                    // ПКМ
                    dispatch(mark(cell));
                }
            },
            [cell],
        ),
    };
    const alt = useMemo(() => {
        if (!cell.uncovered) {
            return cell.marked ? 'Отмеченная ячейка' : 'Нераскрытая ячейка';
        } else {
            return cell.isMine ? 'Мина!' : `Возле ячейки ${cell.minesAround} мин`;
        }
    }, [cell]);
    return (
        <Wrapper onClick={callbacks.onClick} onContextMenu={callbacks.onClick}>
            {!cell.uncovered && !cell.marked && <CellImg data-covered={!cell.uncovered} src={CoveredCell} alt={alt} />}
            {!cell.uncovered && cell.marked && <MarkedCell alt={alt} />}
            {cell.uncovered && !cell.isMine && <UncoveredCell minesAmount={cell.minesAround} alt={alt} />}
        </Wrapper>
    );
};

export default React.memo(Cell);
