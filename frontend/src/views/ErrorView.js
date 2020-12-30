import React from 'react';
import { BoxContainer } from "../styles/layout";
import PaddingWithFlex from "../styles/error";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorView = ({ children, code }) => (
    <BoxContainer>
        <PaddingWithFlex>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <p>Oops, something is wrong (╯°□°）╯︵ ┻━┻</p>
            <span>
                {children}
            </span>
            <p>
                Error code: <span>{code}</span>
            </p>
        </PaddingWithFlex>
    </BoxContainer>
);

export default ErrorView;
