import React from 'react';
import styled from 'styled-components';
import { CellImg } from '../common/cell-img';
import UncoveredCellImage from '../../assets/uncovered_cell.png';
import { CellWithContentWrapper } from '../common/cell-with-content-wrapper';
import { MinesAround } from '../../store/field/types';

const MineCount = styled.p`
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    font-size: 2rem;
    font-weight: 700;
    transform: translate(-50%, -50%);
`;

const UncoveredCell = (props: { minesAmount: MinesAround; alt: string }) => {
    return (
        <CellWithContentWrapper>
            <CellImg src={UncoveredCellImage} alt={props.alt} />
            {props.minesAmount !== 0 && <MineCount>{props.minesAmount}</MineCount>}
        </CellWithContentWrapper>
    );
};

export default React.memo(UncoveredCell);
