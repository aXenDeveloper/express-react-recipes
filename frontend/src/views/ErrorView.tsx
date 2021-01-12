import { FC, useEffect, ReactNode } from 'react';
import config from '../config';

import Error from '../components/Error';
import Breadcrumb from '../components/Breadcrumb';

type ErrorViewType = {
	children: ReactNode;
	code: number;
};

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
