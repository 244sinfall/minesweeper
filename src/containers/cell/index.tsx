import React, { useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { mark, uncover } from '../../store/field/slice';
import CellComponent from '../../components/cell';
import { Cell } from '../../store/field/types';
import DigSound from '../../assets/dig.ogg';
import UnflagSound from '../../assets/whoosh.ogg';
import StickSound from '../../assets/stick.ogg';
import ExplosionSound from '../../assets/explosion.ogg';

const CellContainer = (props: { cell: Cell; onSound: (src: string, override: boolean) => void }) => {
    const dispatch = useAppDispatch();

    const callbacks = {
        onClick: useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                if (props.cell.marked || props.cell.uncovered) return;
                props.onSound(props.cell.isMine ? ExplosionSound : DigSound, true);
                dispatch(uncover(props.cell));
            },
            [props.cell],
        ),
        onMark: useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                if (props.cell.uncovered) return;
                props.onSound(props.cell.marked ? UnflagSound : StickSound, true);
                dispatch(mark(props.cell));
            },
            [props.cell],
        ),
    };
    const desc = useMemo(() => {
        if (!props.cell.uncovered) {
            return props.cell.marked ? 'Отмеченная ячейка' : 'Нераскрытая ячейка';
        } else {
            return props.cell.isMine ? 'Мина!' : `Возле ячейки ${props.cell.minesAround} мин`;
        }
    }, [props.cell]);
    return <CellComponent cell={props.cell} onClick={callbacks.onClick} description={desc} onMark={callbacks.onMark} />;
};

export default React.memo(CellContainer);
