import { FC, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

type ErrorType = {
	children: ReactNode;
	code: number;
};

const Error: FC<ErrorType> = ({ children, code }) => {
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

export default Error;
