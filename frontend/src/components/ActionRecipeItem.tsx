import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import config from '../config';

import Modal from './Modal';
import { useMutation, useQueryClient } from 'react-query';
import { useCSRF } from '../context/csrf';

type ActionRecipeItemType = {
	_id: Object;
};

const ActionRecipeItem: FC<ActionRecipeItemType> = ({ _id }) => {
	const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

	const { tokenCSRF }: any = useCSRF();
	let history = useHistory();

	const queryClient = useQueryClient();
	const { mutateAsync, isLoading } = useMutation(async () => {
		await fetch(`${config.backend_url}/recipes/delete?id=${_id}`, {
			method: 'DELETE',
			headers: {
				CSRF_Token: tokenCSRF
			}
		});

		setIsOpenPopup(false);
		history.push('/recipes');
		return true;
	});

	const handleDelete = async () => {
		await mutateAsync();
		queryClient.invalidateQueries('recipeList');
	};

	return (
		<div className="flex flex-ai:center flex-jc:center margin-bottom">
			<Link to={`/recipes/${_id}/edit`} className="margin-right">
				<button className="button button_primary">
					<FontAwesomeIcon icon={faPencilAlt} /> Edit
				</button>
			</Link>

			<button className="button button_light" onClick={() => setIsOpenPopup(true)}>
				<FontAwesomeIcon icon={faTimes} /> Delete
			</button>

			<Modal isOpen={isOpenPopup} setIsOpen={setIsOpenPopup}>
				{isLoading ? (
					<div className="loading" />
				) : (
					<>
						<FontAwesomeIcon icon={faExclamationTriangle} />
						<div className="modal_content:text">Are you sure you want to delete?</div>
						<div className="flex flex-ai:center flex-jc:center">
							<button className="button button_primary margin-right" onClick={handleDelete}>
								Ok
							</button>
							<button
								className="button"
								onClick={() => {
									setIsOpenPopup(false);
								}}
							>
								Cancel
							</button>
						</div>
					</>
				)}
			</Modal>
		</div>
	);
};

export default ActionRecipeItem;
