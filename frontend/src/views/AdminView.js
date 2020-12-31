import React from 'react';
import { useCSRF } from '../context/csrf';

const AdminView = () => {
    const { memberData } = useCSRF();

    return (
        <div className="container_box">
            <div className="padding">
                Admin {memberData.name}
            </div>
        </div>
    );
};

export default AdminView;
