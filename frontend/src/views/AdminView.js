import React from 'react';
import { useCSRF } from '../context/csrf';
import { BoxContainer, Padding } from "../styles/layout";

const AdminView = () => {
    const { memberData } = useCSRF();

    return (
        <BoxContainer>
            <Padding>
                Admin {memberData.name}
            </Padding>
        </BoxContainer>
    );
};

export default AdminView;
