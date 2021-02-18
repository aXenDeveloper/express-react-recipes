import { FC, useEffect } from 'react';
import { ErrorViewType } from '../types/viewTypes';
import config from '../config';
import Error from '../components/Error';
import Breadcrumb from '../components/Breadcrumb';

const ErrorView: FC<ErrorViewType> = ({ children, code }) => {
  useEffect(() => {
    document.title = `${config.title_page} - Error ${code}`;
  }, [code]);

  return (
    <div className="container">
      <Breadcrumb>{code}</Breadcrumb>

      <Error code={code}>{children}</Error>
    </div>
  );
};

export default ErrorView;
