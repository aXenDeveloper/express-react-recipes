import React from 'react';
import { Link } from 'react-router-dom';
import { useCSRF } from '../context/csrf';
import LogoutButton from './LogoutButton';
import UserbarUl from '../styles/userbar';
import Button from '../styles/button';

const Userbar = () => {
    const { tokenCSRF, memberData } = useCSRF();

    return (
        <UserbarUl>
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
                                <Button primary>
                                    Sign Up
                                </Button>
                            </Link>
                        </li>
                    </>
                )}
        </UserbarUl>
    );
};

export default Userbar;