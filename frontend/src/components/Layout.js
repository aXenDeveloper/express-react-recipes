import React from 'react';
import Header from "./Header";
import { Container } from '../styles/layout';

const Layout = ({ children }) => (
    <>
        <Header />
        <main>
            <Container>
                {children}
            </Container>
        </main>
    </>
);

export default Layout;