import React from 'react';
import Header from "./Header";
import { Container, Main } from '../styles/layout';

const Layout = ({ children }) => (
    <>
        <Header />
        <Main>
            <Container>
                {children}
            </Container>
        </Main>
    </>
);

export default Layout;