import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Breadcrumb: FC = ({ children }) => {
	const location = useLocation();
	const pathname = location.pathname.split('/').filter(x => x);

	return (
		<ul className="breadcrumb">
			<li>
				<Link to="/">
					<FontAwesomeIcon icon={faHome} />
					Home
				</Link>
			</li>

			{pathname.length > 0 && (
				<>
					{pathname.slice(0, pathname.length - 1).map((el, index) => {
						const pathLink = `/${pathname.slice(0, index + 1).join('/')}`;

						return (
							<li>
								<FontAwesomeIcon icon={faChevronRight} />
								<Link to={pathLink}>{el}</Link>
							</li>
						);
					})}

					<li>
						<FontAwesomeIcon icon={faChevronRight} />
						{children}
					</li>
				</>
			)}
		</ul>
	);
};

export default Breadcrumb;
