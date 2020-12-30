import React from 'react';
import { useCSRF } from '../context/csrf';

const Userbar = () => {
    const { tokenCSRF } = useCSRF();

    return (
        <div>
            Userbar
        </div>
    );
};

export default Userbar;