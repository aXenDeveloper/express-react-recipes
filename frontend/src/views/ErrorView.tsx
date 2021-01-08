import { FC, useEffect, ReactNode } from 'react';
import config from '../config';
import Error from '../components/Error';

interface ErrorViewInterface {
	children: ReactNode;
	code: number;
}

const ErrorView: FC<ErrorViewInterface> = ({ children, code }) => {
	useEffect(() => {
		document.title = `${config.title_page} - Error ${code}`;
	}, [code]);

	return <Error code={code}>{children}</Error>;
};

export default ErrorView;
