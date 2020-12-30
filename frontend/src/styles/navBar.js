import styled from 'styled-components';

export const NavBarStyle = styled.nav`
    margin: 0 auto 0 1rem;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;

        li:not(:last-child) {
            margin-right: 1rem;
        }
    }
`;