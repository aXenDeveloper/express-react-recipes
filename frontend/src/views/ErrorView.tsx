import { FC, useEffect, ReactNode } from 'react';
import config from '../config';

import Error from '../components/Error';

type ErrorViewType = {
	children: ReactNode;
	code: number;
};

const ErrorView: FC<ErrorViewType> = ({ children, code }) => {
	useEffect(() => {
		document.title = `${config.title_page} - Error ${code}`;
	}, [code]);

	return <Error code={code}>{children}</Error>;
};

export default ErrorView;
