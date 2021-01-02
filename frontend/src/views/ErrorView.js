import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import config from '../config';

const ErrorView = ({ children, code }) => {
	useEffect(() => {
		document.title = `${config.title_page} - Error ${code}`;
	}, [code]);

	return (
		<div className="container">
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
		</div>
	);
};

export default ErrorView;
