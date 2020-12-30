import styled from 'styled-components';
import { Padding } from './layout';

const PaddingWithFlex = styled(Padding)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > svg {
        font-size: 64px;
    }

    p {
        font-size: 1.6rem;
        color: var(--theme-light-color);
        margin: 1rem 0;

        > span {
            font-weight: bold;
        }
    }

    > span {
        font-size: 24px;
        font-weight: 500;
        line-height: 1.4;
        max-width: 800px;
    }
`;

export default PaddingWithFlex;