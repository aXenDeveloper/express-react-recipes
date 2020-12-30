import styled from 'styled-components';
import { Container } from "./layout";

export const HeaderStyle = styled.header`
    background-color: var(--theme-header);
`;

export const ContainerFlex = styled(Container)`
    display: flex;
    align-items: center;
`;

export const Logo = styled.img`
    max-width: 300px;
    padding: 1rem 0;
`;