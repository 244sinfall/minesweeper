import React from 'react';
import styled from 'styled-components';
import { CellImg } from '../common/cell-img';
import CoveredCell from '../../assets/covered_cell.png';
import { CellWithContentWrapper } from '../common/cell-with-content-wrapper';
import FlagIcon from '../../assets/marked-flag.svg';

const RedFlag = styled(FlagIcon)`
    position: absolute;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: forwards appear 0.2s;
    @keyframes appear {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const MarkedCell = (props: { alt: string }) => {
    return (
        <CellWithContentWrapper>
            <CellImg src={CoveredCell} alt={props.alt} />
            <RedFlag />
        </CellWithContentWrapper>
    );
};

export default React.memo(MarkedCell);
