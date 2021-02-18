import { Link } from 'react-router-dom';
import { useCSRF } from '../context/csrf';
import { AuthContextType } from '../types/contextTypes';

import LogoutButton from './LogoutButton';

const Userbar = () => {
  const { tokenCSRF, memberData } = useCSRF() as AuthContextType;

  return (
    <div className="userbar">
      {tokenCSRF ? (
        <>
          <li>Welcome {memberData.name}</li>
          <li>
            <LogoutButton />
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">
              <button className="button">Existing user? Sign In</button>
            </Link>
          </li>

          <li>
            <Link to="/register">
              <button className="button button_primary">Sign Up</button>
            </Link>
          </li>
        </>
      )}
    </div>
  );
};

export default Userbar;
