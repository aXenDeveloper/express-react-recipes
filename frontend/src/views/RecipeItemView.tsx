import { FC } from 'react';
import { useCSRF } from '../context/csrf';
import config from '../config';

import ErrorView from './ErrorView';
import RecipeIngredients from '../components/widgets/RecipeIngredients';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import ActionRecipeItem from '../components/ActionRecipeItem';

type RecipeItemViewType = {
	match: any;
};

const RecipeItemView: FC<RecipeItemViewType> = ({ match }) => {
	const { tokenCSRF, memberData }: any = useCSRF();

	const { isLoading, isError, data } = useQuery(
		'recipeItem',
		async () => {
			const res = await fetch(`${config.backend_url}/recipes/item?id=${match.params.id}`);
			return await res.json();
		},
		{ cacheTime: 0 }
	);

	if (isLoading) return <Loading />;

	if (isError) return <ErrorView code={500}>There was a problem with API connection.</ErrorView>;

	return (
		<div className="container">
			<div className="container_wraper">
				<div className="container_wraper_main">
					<div className="recipe_header">
						<img src={`${config.backend_url}/uploads/${data.recipeItem.image_url}`} alt={data.recipeItem.title} />

						<div className="recipe_header_content">
							<div className="recipe_header_content_box">
								<h1 className="recipe_header_content_box:title">{data.recipeItem.title}</h1>
								<div className="recipe_header_content_box:author">
									Author: <span>{data.recipeItem.member_name}</span>
								</div>
							</div>
						</div>
					</div>

					<div className="container_box padding">
						<div dangerouslySetInnerHTML={{ __html: data.recipeItem.description }} />
					</div>
				</div>

				<div className="container_wraper_widget">
					{tokenCSRF && (memberData.group_id === 4 || memberData._id === data.recipeItem.member_id) && (
						<ActionRecipeItem _id={data.recipeItem._id} />
					)}

					<RecipeIngredients ingredients={data.recipeItem.ingredients} />
				</div>
			</div>
		</div>
	);

	/* useEffect(() => {
		const getItemAPI = async () => {
			setLoading(true);

			try {
				const itemAPI = await fetch(`${config.backend_url}/recipes/item?id=${match.params.id}`);

				const dataItemAPI = await itemAPI.json();

				if (itemAPI.status === 200) {
					setDataItem(dataItemAPI.recipeItem);
					setStatusItem(itemAPI.status);

					document.title = `${config.title_page} - Recipes - ${dataItemAPI.recipeItem.title}`;
				} else setStatusItem(itemAPI.status);

				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		};

		getItemAPI();
	}, [match.params.id]);

	const deleteAPI = async () => {
		try {
			const itemAPI = await fetch(`${config.backend_url}/recipes/delete?id=${match.params.id}`, {
				method: 'DELETE',
				headers: {
					CSRF_Token: tokenCSRF
				}
			});

			if (itemAPI.status === 200) {
				setIsOpenPopup(false);
				history.push('/recipes');
			}
		} catch (err) {
			console.error(err);
		}
	};

	if (loading)
		return (
			<div className="container">
				<div className="loading" />
			</div>
		);

	if (statusItem === 200)
		return (
			<div className="container">
				<div className="container_wraper">
					<div className="container_wraper_main">
						<div className="recipe_header">
							<img src={`${config.backend_url}/uploads/${dataItem.image_url}`} alt={dataItem.title} />
							<div className="recipe_header_content">
								<div className="recipe_header_content_box">
									<h1 className="recipe_header_content_box:title">{dataItem.title}</h1>
									<div className="recipe_header_content_box:author">
										Author: <span>{dataItem.member_name}</span>
									</div>
								</div>
							</div>
						</div>

						<div className="container_box padding">
							<div dangerouslySetInnerHTML={{ __html: dataItem.description }} />
						</div>
					</div>

					<div className="container_wraper_widget">
						{tokenCSRF && (memberData.group_id === 4 || memberData._id === dataItem.member_id) && (
							<div className="flex flex-ai:center flex-jc:center margin-bottom">
								<Link to={`/recipes/${dataItem._id}/edit`} className="margin-right">
									<button className="button button_primary">
										<FontAwesomeIcon icon={faPencilAlt} /> Edit
									</button>
								</Link>

								<button className="button button_light" onClick={() => setIsOpenPopup(true)}>
									<FontAwesomeIcon icon={faTimes} /> Delete
								</button>

								<Modal isOpen={isOpenPopup} setIsOpen={setIsOpenPopup}>
									<FontAwesomeIcon icon={faExclamationTriangle} />
									<div className="modal_content:text">Are you sure you want to delete?</div>
									<div className="flex flex-ai:center flex-jc:center">
										<button className="button button_primary margin-right" onClick={() => deleteAPI()}>
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
								</Modal>
							</div>
						)}

						<RecipeIngredients ingredients={dataItem.ingredients} />
					</div>
				</div>
			</div>
		);

	return <ErrorView code={404}>The page you requested does not exist</ErrorView>; */
};

export default RecipeItemView;
