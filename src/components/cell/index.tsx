import React from 'react';
import { ICell } from '../../store/field/types';
import styled from 'styled-components';
import FlagIcon from '../../assets/marked-flag.svg';
import ExplosionGif from '../../assets/explosion.gif';

interface CellComponentProps {
    cell: ICell;
    description: string;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMark: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Explosion = styled.img`
    position: absolute;
    z-index: 2;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const RedFlag = styled(FlagIcon)`
    position: absolute;
    z-index: 2;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s;
`;

const MineCount = styled.p`
    position: absolute;
    z-index: 2;
    margin: 0;
    top: 50%;
    left: 50%;
    font-size: 2rem;
    font-weight: 700;
    transform: translate(-50%, -50%);
`;

const CellComp = styled.div<{ isMine: boolean }>`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0) scale(1, 1);
    background: rgb(8, 2, 103);
    background: linear-gradient(160deg, rgba(8, 2, 103, 1) 0%, rgba(9, 9, 121, 1) 34%, rgba(41, 114, 129, 1) 100%)
        border-box;
    transition: background-color 100ms;
    border-radius: 1rem;

    &[data-uncovered='true'] {
        border: 0.5rem solid transparent; /*2*/
        box-shadow: 0 0 0 13px #333;
        background: linear-gradient(160deg, rgba(8, 2, 103, 1) 0%, rgba(9, 9, 121, 1) 34%, rgba(41, 114, 129, 1) 100%)
            border-box;
        -webkit-mask: /*4*/ linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor; /*5'*/
        mask-composite: exclude; /*5*/
        //clip-path: polygon(0% 0%, 0 100%, 10% 90%, 10% 10%, 90% 10%, 90% 90%, 10% 90%, 0 100%, 100% 100%, 100% 0%);
    }
`;
const Wrapper = styled.div`
    user-select: none;
    position: relative;
    margin: 1px;
    &[data-uncovered='false'][data-marked='false']:hover {
        filter: grayscale(50%);
        -webkit-filter: grayscale(50%);
    }
    &[data-marked='true'] > ${RedFlag} {
        opacity: 1;
    }
`;

const CellComponent = (props: CellComponentProps) => {
    return (
        <Wrapper
            onClick={props.onClick}
            onContextMenu={props.onMark}
            aria-label={`${props.cell.y + 1} ячейка сверху. ${props.cell.x + 1} ячейка слева. ${props.description}`}
            data-marked={props.cell.marked}
            data-uncovered={props.cell.uncovered}
        >
            <CellComp data-uncovered={props.cell.uncovered} isMine={props.cell.isMine}></CellComp>
            <RedFlag />
            {props.cell.minesAround !== 0 && props.cell.uncovered && !props.cell.isMine && (
                <MineCount>{props.cell.minesAround}</MineCount>
            )}
            {props.cell.uncovered && props.cell.isMine && <Explosion src={ExplosionGif} alt={'Мина сработала!'} />}
        </Wrapper>
    );
};

export default React.memo(CellComponent);
