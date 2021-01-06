import { FC, useEffect, useState } from 'react';
import ErrorView from './ErrorView';
import config from '../config';
import RecipeIngredients from '../components/widgets/RecipeIngredients';
import { useCSRF } from '../context/csrf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

type RecipeItemViewType = {
	match: any;
};

const RecipeItemView: FC<RecipeItemViewType> = ({ match }) => {
	const [statusItem, setStatusItem] = useState<number>(0);
	const [dataItem, setDataItem] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);

	const { tokenCSRF, memberData }: any = useCSRF();

	useEffect(() => {
		const api = async () => {
			try {
				setLoading(true);
				const itemAPI = await fetch(`${config.backend_url}/recipes/item?id=${match.params.id}`);

				const dataItemAPI = await itemAPI.json();

				if (itemAPI.status === 200) {
					setDataItem(dataItemAPI.recipeItem);
					document.title = `${config.title_page} - Recipes - ${dataItemAPI.recipeItem.title}`;
					setStatusItem(itemAPI.status);

					console.log(dataItemAPI.recipeItem);
					console.log(JSON.parse(dataItemAPI.recipeItem.ingredients));
				} else setStatusItem(itemAPI.status);

				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		};
		api();
	}, [match.params.id]);

	return (
		<div className="container">
			{loading ? (
				<div className="loading" />
			) : (
				<>
					{statusItem === 200 ? (
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

										<button className="button button_light">
											<FontAwesomeIcon icon={faTimes} /> Delete
										</button>
									</div>
								)}

								<RecipeIngredients ingredients={dataItem.ingredients} />
							</div>
						</div>
					) : (
						<ErrorView code={404}>The page you requested does not exist</ErrorView>
					)}
				</>
			)}
		</div>
	);
};

export default RecipeItemView;
