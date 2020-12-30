import React from 'react';
import { useCSRF } from '../context/csrf';

const AdminView = () => {
    const { memberData } = useCSRF();

    return (
        <div>
            Admin {memberData.name}
        </div>
    );
};

export default AdminView;
