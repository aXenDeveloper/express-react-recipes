import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorView = ({ children, code }) => (
    <div className="container_box">
        <div className="errorBox">
            <FontAwesomeIcon icon={faExclamationCircle} />
            <p>Oops, something is wrong (╯°□°）╯︵ ┻━┻</p>
            <span>
                {children}
            </span>
            <p>
                Error code: <span>{code}</span>
            </p>
        </div>
    </div>
);

export default ErrorView;
