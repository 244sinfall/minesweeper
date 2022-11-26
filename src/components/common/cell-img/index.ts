import styled from 'styled-components';

export const CellImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    &[data-covered='true']:hover {
        mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 50%) 0%, rgba(0, 0, 0, 70%) 100%);
    }
`;
