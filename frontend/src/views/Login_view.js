import React from 'react';

const Login_view = () => {
    const api = async () => {
        try {
            const api = await fetch('http://localhost:8000/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'admin@admin.pl',
                    password: 'admin123'
                })
            });

            const data = await api.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <button onClick={api}>Login</button>
        </div>
    );
};

export default Login_view;