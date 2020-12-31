import React from 'react';
import { Link } from 'react-router-dom';
import { useCSRF } from '../context/csrf';
import LogoutButton from './LogoutButton';

const Userbar = () => {
    const { tokenCSRF, memberData } = useCSRF();

    return (
        <div className="userbar">
            {tokenCSRF ? (
                <>
                    <li>
                        Welcome {memberData.name}
                    </li>
                    <li>
                        <LogoutButton />
                    </li>
                </>
            ) : (
                    <>
                        <li>
                            <Link to="/login">
                                Existing user? Sign In
                            </Link>
                        </li>

                        <li>
                            <Link to="/register">
                                <button className="button button_primary">
                                    Sign Up
                                </button>
                            </Link>
                        </li>
                    </>
                )}
        </div>
    );
};

export default Userbar;