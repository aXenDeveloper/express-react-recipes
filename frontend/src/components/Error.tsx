import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ErrorViewType } from '../types/viewTypes';

const Error: FC<ErrorViewType> = ({ children, code }) => {
  return (
    <div className="container_box">
      <div className="errorBox">
        <FontAwesomeIcon icon={faExclamationCircle} />
        <p>Oops, something is wrong (╯°□°）╯︵ ┻━┻</p>
        <span>{children}</span>
        <p>
          Error code: <span>{code}</span>
        </p>
      </div>
    </div>
  );
};

export default Error;
